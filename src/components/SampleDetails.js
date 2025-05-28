import React from 'react';

import { formatCollectionYearRange, formatMetaDataRegions } from '@dana-allen/gdb-core'


const SampleDetails = ({ meta_data }) => {

    const regions = meta_data.region ? formatMetaDataRegions(meta_data.region) : null



    return (
        <div >
            <h4 class="title-sub">Sample Details</h4>
            <table class="table table-striped table-bordered table-font">
                <tbody>
                    <tr>
                        <td><b>Isolate ID</b></td>
                        <td>{meta_data.isolate ? `${meta_data.isolate}`:"-"}</td>
                    </tr>
                    <tr>
                        <td><b>Isolation Source</b></td>
                        <td>{meta_data.isolation_source ? `${meta_data.isolation_source}`:"-"}</td>
                    </tr>
                    <tr>
                        <td><b>Host Species</b></td>
                        <td><em>{meta_data.host ? `${meta_data.host}`:"-"}</em></td>
                    </tr>
                    <tr>
                        <td><b>Taxonomy</b></td>
                        <td>{meta_data.taxonomy ? `${meta_data.taxonomy.split(';')}`:"-"}</td>
                    </tr>
                    
                    <tr>
                        <td><b>Collection Year Range</b></td>
                        <td>{formatCollectionYearRange(meta_data.earliest_collection_year, meta_data.latest_collection_year)}</td>
                    </tr>
                    {regions && 
                        <>
                            <tr>
                                <td><b>Country of Origin</b></td>
                                <td>
                                    {regions.display_name ? `${regions.display_name} ${regions.display_name ? 
                                    `(${regions.id})`:""}`:"-" }
                                </td>
                            </tr>
                            <tr>
                                <td><b>Country Development Status</b></td>
                                <td className='capitalize-text' >
                                    {regions.development_status ? `${regions.development_status} 
                                    ${regions.development_status=='developing' ? `/ ${regions.status}`:""}`:"-"}
                                </td>
                            </tr>
                            <tr>
                                <td><b>Global Region</b></td>
                                <td className='capitalize-text' >
                                    {regions.m49_region_id ? `${regions.m49_region_id}`:"-"} / 
                                    {regions.m49_sub_region_id ? ` ${regions.m49_sub_region_id}`:" -"}
                                </td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SampleDetails;