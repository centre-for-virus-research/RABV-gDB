import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import SampleDetails from '../../../components/SampleDetails';
import SequenceDetails  from '../../../components/SequenceDetails';
import { useApiEndpoint, useErrorHandler, useLoadingWheelHandler, GenomeViewer, GenomeViewer2, GenomeViewerNew } from '@centre-for-virus-research/gdb-core-package';


import { buildGenomeViewerResults } from '@centre-for-virus-research/gdb-core-package';

// Importing stylesheets
import '../../../assets/styles/sequence.css'

const Sequence = () => {


    const { id } = useParams();

    const [genomeViewerData, setGenomeViewerData] = useState([])
    const [sequenceData, setSequenceData] = useState([])
    const [sequenceDataNew, setSequenceDataNew] = useState([])

    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    const url = `/api/sequences/get_sequence_meta_data/${id}`;
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);

    const parseSequenceDataNew = (data) => {
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
                        seq: data["sequence"].toUpperCase(),
                        features: features
        }
        
        return results
    }

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
                        seq: data["sequence"].toUpperCase(),
                        alignedSeq: [{query:id, seq:data["sequence"].toUpperCase()}],
                        features: features
        }
        
        return results
    }
    const processAlignmentData = useCallback(() => {
        if (endpointData["alignment"]){
            console.log(endpointData["alignment"])
            const data = buildGenomeViewerResults(endpointData)
            setGenomeViewerData([data])
        }
    }, [endpointData])

    const processSequenceData = useCallback(() => {
        if (endpointData["meta_data"]){
            const data = parseSequenceData(endpointData)
            setSequenceData([data])
            console.log(data)
        }
    })

    const processSequenceDataNew = useCallback(() => {
        if (endpointData["meta_data"]){
            const data = parseSequenceDataNew(endpointData)
            setSequenceDataNew([data])
            console.log(data)
        }
    })


    useEffect(() => {
        triggerLoadingWheel(isPending)
        if(endpointError) triggerError(endpointError);
        processAlignmentData()        
        processSequenceData()
        processSequenceDataNew()
    }, [processAlignmentData, endpointError, isPending]);


    const meta = endpointData?.meta_data;
    const pubmedId = meta?.pubmed_id;
    const insertions = endpointData?.alignment?.insertions;


    const downloadData = (data) => {
        const fastaContent = `>${id}\n${data}`;
        const blob = new Blob([fastaContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${id}.fasta`;
        document.body.appendChild(a);
        a.click();
    
        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }


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
                        <div>
                            <Button size='sm' className='btn-main-filled' onClick={() => downloadData(endpointData["sequence"].toUpperCase())}>Download Sequence</Button>
                        </div>
                        {/* <GenomeViewerNew data={genomeViewerData} /> */}
                        {/* <GenomeViewer2 data={sequenceData}/> */}
                        {sequenceDataNew && <GenomeViewerNew data={sequenceDataNew}/>}
                    </div>
                    <hr></hr>
                    { meta.exclusion_status === 0 && 
                        <div class='row'>
                            <div class="col-md-6">
                                <h4 class='title-sub'>Alignment</h4>
                            </div>
                            <div>
                                <Button size='sm' className='btn-main-filled' onClick={() => downloadData(endpointData["alignment"]["alignment"])}>Download Alignment</Button>
                            </div>
                            {/* <GenomeViewer data={genomeViewerData}/> */}

                            {genomeViewerData && <GenomeViewerNew data={genomeViewerData} refId={endpointData.alignment.alignment_name}/>}
                        </div>

                    }
                    <br></br>
                    <hr></hr>
                    { insertions &&
                    <div class='row'>
                        <div class="col-md-6">
                            <h4 class='title-sub'>Insertions</h4>
                        </div>
                        <div>
                            {insertions.map((insertion, i) => (
                                <p>{insertion.insertion}</p>
                            ))}

                            
                        </div>
                    </div>
                    }
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
