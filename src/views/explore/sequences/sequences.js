import React, { useState, useEffect, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// gDB-core components import: This create the tables and buttons to view the data
import { SequencesTable, SequencesFilter, DownloadDropdown } from '@dana-allen/gdb-core';

// gDB-core hooks import: This creates an API request to grab the data from the server
import { useApiEndpoint, useFilterParams, submitApiQuery, useErrorHandler, useLoadingWheelHandler } from '@dana-allen/gdb-core';

// Style imports
import '../../../assets/styles/sequences.css'



const Sequences = ( { filters=null } ) => {

    const [params, setParams] = useFilterParams(filters);
    const [data, setData] = useState([])
    const [showFilter, setShowFilter] = useState(false);
    const { triggerError } = useErrorHandler();
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    

    const url = params ? "/api/sequences/get_sequences_meta_data_by_filters/" : 
                        "/api/sequences/get_sequences_meta_data/";
    const { endpointData, isPending, endpointError } = useApiEndpoint(url, params);
    

    useEffect(() => {
        triggerLoadingWheel(isPending)
        if (endpointError) triggerError(endpointError)
        if (endpointData) setData(endpointData);
    }, [endpointError, endpointData, isPending]);


    const handleData = async (data) => {
        if (data.status === 200){
            const json = await data.json();  
            setData(json)
        }
    }
    const handleFiltersChange = useCallback((data) => {
        setParams(data)
        const queryString = new URLSearchParams(data).toString();
        const fullUrl = `${process.env.REACT_APP_BACKEND_URL}${'/api/sequences/get_sequences_meta_data_by_filters/'}${queryString ? `?${queryString}` : ''}`;
        submitApiQuery(fullUrl, false, handleData)
        setShowFilter(false);
    }, []);

    return (
        <div className="container">
            <h2>Sequences</h2>
            <p>This dataset contains all {process.env.REACT_APP_VIRUS_NAME} virus sequences from NCBI nucleotide.</p>
            
            <div className='col right-align' >
                <ButtonGroup>
                    <Button className="paging-buttons" onClick={() => setShowFilter(true)}> Filters </Button>
                    <DownloadDropdown filters={params} />
                </ButtonGroup>   
            </div>

            <div class='padding-table'>
                <SequencesTable data={data} />
                <SequencesFilter show={showFilter} onFilterSelect={handleFiltersChange} onClose={() => setShowFilter(false)}/>
            </div>
       </div>
       
    );
};
 
export default Sequences;



