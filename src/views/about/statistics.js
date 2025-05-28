import React from "react";


import { StatisticsTable } from '@centre-for-virus-research/gdb-core-package';
 
const Statistics = () => {
    return (
        <div class="container">
            <h2>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} Statistics</h2>
            <StatisticsTable></StatisticsTable>
            
        </div>
    );
};
 
export default Statistics;
