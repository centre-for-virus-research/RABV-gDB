import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import {  SequenceDetails, SampleDetails } from '@dana-allen/gdb-core';
import { useApiEndpoint, useErrorHandler, useLoadingWheelHandler, GenomeViewer, GenomeViewer2 } from '@dana-allen/gdb-core';


import { buildGenomeViewerResults } from '@dana-allen/gdb-core';

// Importing stylesheets
import '../../../assets/styles/sequence.css'

const Sequence = () => {


    const { id } = useParams();

    const [genomeViewerData, setGenomeViewerData] = useState([])
    const [sequenceData, setSequenceData] = useState([])

    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    const url = `/api/sequences/get_sequence_meta_data/${id}`;
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);

    const parseSequenceData = (data) => {


        const locationRegex = /cds_location:\s<?(\d+)\.\.>?(\d+);.*?product:\s([^;]+)/g;


        // Using matchAll to find all matches
        const matches = [...data["meta_data"]["cds_info"].matchAll(locationRegex)];
        console.log(data["meta_data"]["cds_info"])
        console.log(matches)
        // Extracting and formatting the results
        const features = matches.map(match => {
            const start = match[1];
            const end = match[2];
            const product = match[3];  // Extracting the product name
            
            return {
                name: product,  // You can adjust this to be dynamic if necessary
                start: parseInt(start), // Start position
                end: parseInt(end) // End position
            };
        });
        const results = {primary_accession: id,
                        seq: endpointData["sequence"].toUpperCase(),
                        alignedSeq: [{query:id, seq:endpointData["sequence"]}],
                        features: features
        }
        console.log("parsing")
        console.log(results)
        
        return results
    }
    const processAlignmentData = useCallback(() => {
        if (endpointData["alignment"]){
            const data = buildGenomeViewerResults(endpointData)
            setGenomeViewerData([data])
        }
    }, [endpointData])

    const processSequenceData = useCallback(() => {
        if (endpointData["meta_data"]){
            console.log(endpointData)
            const data = parseSequenceData(endpointData)
            setSequenceData([data])
        }
    })

    

    useEffect(() => {
        triggerLoadingWheel(isPending)
        if(endpointError) triggerError(endpointError);
        processAlignmentData()        
        processSequenceData()
    }, [processAlignmentData, endpointError, isPending]);


    const meta = endpointData?.meta_data;
    const pubmedId = meta?.pubmed_id;

    return (
        <div class='container'>
            <div class="row col-md-6">
                <h2 >Sequence {id} </h2>
            </div>
            
            { meta && 
                <div>
                    <div class="row">
                        <div class="col-md-6">
                            <SequenceDetails meta_data={meta} 
                                            alignment={endpointData.alignment ? endpointData.alignment : null} />
                        </div>
                        <div class="col-md-6">
                            <SampleDetails meta_data={meta} />
                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-md-6">
                            <h4 class='title-sub'>Sequence</h4>
                        </div> 
                        <GenomeViewer2 data={sequenceData}/>
                    </div>
                    <div class='row'>
                        <div class="col-md-6">
                            <h4 class='title-sub'>Alignment</h4>
                        </div> 
                        <GenomeViewer data={genomeViewerData}/>
                    </div>
                    { pubmedId && 
                        <div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h4 class='title-sub'>Reference</h4>
                                </div> 
                            </div> 
                            <div class="row">
                                <div class="col-md-6">
                                    <div>
                                        <Link class='custom-link reference' to={`https://www.ncbi.nlm.nih.gov/pubmed/${endpointData.meta_data.pubmed_id}`} target="_blank"> <FontAwesomeIcon icon={faLink} /> PubMed {endpointData.meta_data.pubmed_id} </Link>
                                    </div>
                                </div>  
                            </div> 
                        </div>
                    }
                </div>
            }

            <br></br>

        </div>
    );
};
 
export default Sequence;
