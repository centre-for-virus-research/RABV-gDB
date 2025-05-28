import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"
import { APITable } from '@centre-for-virus-research/gdb-core';


import '../../assets/styles/offlineApi.css'


const Api = () => {

    return (
        <div class='container'>  
            <h2>API Endpoints</h2>
            <p>Implement these API endpoints to access {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} data for local usage.</p>
            <APITable></APITable>
            
                
            {/* <SwaggerUI url="/openapi_new.json"
                        defaultModelsExpandDepth={-1} /> */}
            {/* <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json"/> */}

        </div> 
    );
};
 
export default Api;
