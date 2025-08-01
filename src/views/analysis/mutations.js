import React, { useState } from 'react';
import { MutationsFilter, MutationsGraph, useLoadingWheelHandler, MutationsTable } from '@centre-for-virus-research/gdb-core-package'

const Mutations = () => {
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const [mutationsData, setMutationsData] = useState([]);
    console.log(mutationsData.length)

    const handleMutations = (data) => { setMutationsData(data) }
    const handlePending = (isPending) => { triggerLoadingWheel(isPending) }


    return (
        <div class='container'>
            <h2>Mutations Explorer</h2>
            <p>Explore mutations across different codon locations for various hosts.</p>
            <div className='row'> 
                <div className='col-4 float-left' >
                    <h6>Search Conditions</h6>
                    <MutationsFilter onDataLoad={handleMutations} onPending={handlePending}/>
                </div>
                <div className='col-8 float-right'>
                    {mutationsData.length > 0 && <MutationsGraph data={mutationsData}/> }
                </div>
            </div>
            <br></br>
            {mutationsData.length > 0 && <MutationsTable mutations={mutationsData} />}
        </div>
    );
};
 
export default Mutations;