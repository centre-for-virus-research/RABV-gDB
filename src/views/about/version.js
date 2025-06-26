import React, { useEffect } from "react";
import { useApiEndpoint, useErrorHandler, useLoadingWheelHandler } from '@centre-for-virus-research/gdb-core-package';

const packageJson = require('../../../package.json'); 


const Version = () => {
    const url = `/api/get_vgt_version/`;
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);

    const { triggerError } = useErrorHandler();
    const { triggerLoadingWheel } = useLoadingWheelHandler();


    useEffect(() => {
        triggerLoadingWheel(isPending)
        if (endpointError) triggerError(endpointError)
    }, [endpointError, isPending]);

    console.log(endpointData)
    return (
        <div class="container ">
            <h2>Version Information</h2>
            <div style={{'width':"50%"}}>
            <table class="table table-striped table-bordered table-font">
                <tbody>
                    { endpointData.map((version) => (
                        <tr>
                            <td><b>{version.Software}</b></td>
                            <td>{version.Version}</td>
                        </tr>
                    ))}
                    <tr>
                        <td><b>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} version</b></td>
                        <td>{packageJson.version}</td>
                    </tr>

                </tbody>
                
            </table>
            </div>
           
        </div>
    );
};
 
export default Version;
