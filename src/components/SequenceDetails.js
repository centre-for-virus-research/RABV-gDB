import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink} from '@fortawesome/free-solid-svg-icons'

import { formatGenomeCoverage } from '@dana-allen/gdb-core'

const SequenceDetails = ({ meta_data, alignment }) => {

    return (
        <div>
            <h4 class="title-sub">Sequence Details</h4>	
            <table class="table table-striped table-bordered table-font" >
                <tbody>
                    <tr>
                        <td><b>NCBI Nucleotide DB Entry</b></td>
                        <td><Link className='custom-link' to={`https://www.ncbi.nlm.nih.gov/nuccore/${meta_data.primary_accession}`} target="_blank"><FontAwesomeIcon icon={faLink} /> {meta_data.primary_accession}</Link></td>
                    </tr>
                    <tr>
                        <td><b>NCBI Entry Creation Date</b></td>
                        <td><Moment format="DD-MMM-YYYY">{meta_data.create_date}</Moment></td>
                    </tr>
                    <tr>
                        <td><b>NCBI Last Update Date</b></td>
                        <td><Moment format="DD-MMM-YYYY">{meta_data.update_date}</Moment></td>
                    </tr>
                    <tr>
                        <td><b>Sequence Length</b></td>
                        <td>{meta_data["length"] ? meta_data["length"] : '-'}</td>
                    </tr>
                    <tr>
                        <td><b>Strand</b></td>
                        <td>{meta_data["strandedness"] ? meta_data["strandedness"] : "-"}</td>
                    </tr>
                    <tr>
                        <td><b>Topology</b></td>
                        <td>{meta_data["topology"] ? meta_data["topology"] : "-"}</td>
                    </tr>
                    <tr>
                        <td><b>Type</b></td>
                        <td>{meta_data["mol_type"] ? meta_data["mol_type"] : "-"}</td>
                    </tr>
                    <tr>
                        <td><b>Patent-related?</b></td>
                        <td>{meta_data.patent_related ? meta_data.patent_related : '-'}</td>
                    </tr>
                    {/* <tr>				
                        <td><b>Clade membership</b></td>
                        <td><Link className='custom-link' to={`/sequences`} state={{ country : false, clade:true, clades:[sequence.minor_clade, sequence.major_clade] }}>{sequence.major_clade} {sequence.minor_clade}</Link></td>
                    </tr> */}
                </tbody>

                <tbody>

                    {alignment &&
                    <tr>
                        <td><b>Coverage of Genome Region</b><br/>based on homology with<br/><Link className='custom-link' to={`/reference/${alignment.alignment_name}`}>{alignment.alignment_name}</Link></td>
                        <td><div>
                            {alignment.features.map((feature) => (
                                <div>
                                {/* {formatGenomeCoverage(alignment.alignment, feature.start, feature.end) > 0 && 
                                    <a className='capitalize-text' style={{color:'var(--secondary)', 'text-decoration':'none'}}>{feature.product}: {formatGenomeCoverage(alignment.alignment, feature.start, feature.end)}%<br/></a>
                                } */}
                                {formatGenomeCoverage(alignment.alignment, feature.cds_start, feature.cds_end) > 0 && 
                                    <a className='capitalize-text' style={{color:'var(--secondary)', 'text-decoration':'none'}}>{feature.product}: {formatGenomeCoverage(alignment.alignment, feature.cds_start, feature.cds_end)}%<br/></a>
                                }
                                </div>
                            ))}
                        </div></td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
};

export default SequenceDetails;