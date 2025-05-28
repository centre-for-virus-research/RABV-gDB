import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LoadingWheel, ErrorMessage, GenomeRegionAnnotationsTable, GenomeViewer, PagingButtons  } from '@centre-for-virus-research/gdb-core-package';

import { useApiEndpoint, useErrorHandler, useLoadingWheelHandler } from '@centre-for-virus-research/gdb-core-package';

// Styling
import '../../../assets/styles/reference.css'

const Reference = () => {

    const { id } = useParams();

    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();


    const [currentItems, setCurrentItems] = useState([]);
    const [startRecord, setStartRecord] = useState('')
    const [endRecord, setEndRecord] = useState('')

    const handlePageChange = (items) => {
        console.log(items)
        const t = buildGenomeViewerResults(items[0])
            console.log(t)
            setNextAlign(t)
        // setCurrentItems(items[0]);
        setStartRecord(items[1]);
        setEndRecord(items[2])
    };

    const url = `/api/alignments/get_reference_sequence/${id}`;
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);

    const buildGenomeViewerResults = (data) => {
        // var results = []
        var features = []
        for(let i=0; i< endpointData["ref_features"].length; i++){
        features.push({name: endpointData["ref_features"][i]["product"], 
            start: endpointData["ref_features"][i]["cds_start"],
            end: endpointData["ref_features"][i]["cds_end"]
        })
    }

        var alignedSeq = []
        for(let i=0; i< data.length; i++){
            alignedSeq.push({query:data[i]["sequence_id"], 
                            seq:data[i]["alignment"],
                            features:data[i]["features"]}
                            )
        }

            
        const results = {primary_accession: id,
                        seq: endpointData["ref_sequence"],
                        alignedSeq: alignedSeq,
                        features: features}
            // results.append(results)
            


        return [results]

    }

    const [nextAlign, setNextAlign] = useState()
    useEffect(() => {
        triggerLoadingWheel(isPending)
        if(endpointError) triggerError(endpointError);
        if (endpointData["aligned_sequences"]){
            // const t = buildGenomeViewerResults()
            // console.log(t)
            // setNextAlign(t)
        } 

    }, [endpointError, endpointData, isPending]);

    return (
        
        <div class='container'>
        <div className='row'>
            <h2>Reference Sequence {id}</h2>
            <p>
                Underlying sequence:&nbsp;
                <Link class='gdb-link' to={`/sequence/${id}`}>{id}</Link>
                <br></br>
            </p>
            <div class='row'>
                <h4 class="title-sub">Genome region annotations</h4>
                {endpointData["ref_features"] && <GenomeRegionAnnotationsTable genome={endpointData["ref_features"]} />}
            </div>
            {endpointData["aligned_sequences"] &&<h4 class="title-sub">Aligned Sequences</h4>}
            {endpointData["aligned_sequences"] && 
            <div>
                <div>
            
            </div>
            <div className='row'>
            <div style={{alignItems:'right'}}><PagingButtons data={endpointData["aligned_sequences"]} onPageChange={handlePageChange}> </PagingButtons></div>
            {/* {endpointData["aligned_sequences"] && <PagingButtonsDownload data={endpointData["aligned_sequences"]} onPageChange={handlePageChange}> </PagingButtonsDownload> } */}
            <a>Aligned Sequences {startRecord} to {endRecord} of {endpointData["aligned_sequences"].length}</a>
                {nextAlign && <GenomeViewer data={nextAlign}/>}
                
                </div>
                </div>
            }

        </div> 
        <br></br>
    </div>
       
    );
};
 
export default Reference;

