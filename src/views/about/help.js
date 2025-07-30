import React from "react";
 
import { Tabs, Tab } from 'react-bootstrap';

const Help = () => {
    return (
        <div class="container">
            <h2>Help</h2>

            <Tabs defaultActiveKey="mutations" id="tabs" className="mb-3">
                <Tab eventKey="mutations" title="Mutations">
                    <h4>Inputs</h4>
                    <div class="row">

                        <div class="col-6">
                            <ul>
                                <li>
                                    <a style={{'color':'var(--primary)'}}><i>Host(s)</i></a>: 
                                    Select host(s) from dropdown menu. The mutations will 
                                    be calculated per host.
                                </li>
                                <li>
                                    <a style={{'color':'var(--primary)'}}><i>Clade</i></a>:
                                    Major/minor clade you want to filter sequences on.
                                </li>
                                <li>
                                    <a style={{'color':'var(--primary)'}}><i>Region</i></a>:
                                    Section of virus genome.
                                </li>
                                <li>
                                    <a style={{'color':'var(--primary)'}}><i>Codon(s)</i></a>:
                                    Select codon(s) from drop down list. You can select as 
                                    many codons as you would like. The mutations are calculated
                                    for all of the codons/amino acid at that codon position.

                                </li>
                            </ul>
                        </div>
                        
                        <div class="col-6">
                            <img src='/mutations.png' style={{'width':'80%'}}></img>
                        </div>
                    </div>
                    
                    <hr></hr>

                    <h4>Results</h4>
                    
                    

                    <div class="row">
                        <div class="col-6">
                            <a style={{'color':'var(--primary)'}}><i>Mutations Chart</i></a>
                            <p>
                                The chart shows the percentage of the combintation of mutations for codons
                                for each host submitted. The chart shows the top 80% of mutations combinations. 
                                The last 20% is condensed into an "other" category. 
                            </p>

                        </div>
                        <div class="col-6">
                            <img src='/mutations_chart.png' style={{'width':'100%'}}></img>

                        </div>

                    </div>
                    
                    <div class="row">
                        <div class="col-6">
                            <a style={{'color':'var(--primary)'}}><i>Mutations Table</i></a>
                            <p>
                                The 
                            </p>

                        </div>
                        <div class="col-6">
                            <img src='/mutations_table.png' style={{'width':'100%'}}></img>
                        </div>
                    </div>

                    



                </Tab>
                <Tab eventKey="alignment" title="Sequence Alignment">
                    <h4>Inputs</h4>
                    <div class="row">

                        <div class="col-5">
                            <ul>
                                <li>
                                    <a style={{'color':'var(--primary)'}}><i>Query sequence(s)</i></a>: 
                                    Enter sequence(s) in fasta format with each sequence seperated by a newline.
                                    <p style={{'font-size':'12px'}}>
                                        Example format: 
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&gt;sequence_id_1
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;ATTCA..
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&gt;sequence_id_2
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;ATTCA..
                                    </p>
                                </li>
                                <li>
                                    <a style={{'color':'var(--primary)'}}><i>FASTA file</i></a>:
                                    Upload .fasta file.
                                </li>
                                <li><i>Note: none of the sequences or files submitted will be stored</i></li>
                            
                            </ul>
                        </div>
                        
                        <div class="col-7">
                            <img src='/alignment_input.png' style={{'width':'100%'}}></img>
                        </div>
                    </div>

                    <hr></hr>

                    <h4>Results</h4>
                    <div class="row">
                        <p>
                            <ol>
                                <li>
                                    <a style={{'color':'var(--primary)'}}><i>BLAST search</i></a>
                                    <br></br>
                                    <p>
                                        V-gTK does a BLAST search of the submitted sequences against the
                                        {process.env.REACT_APP_VIRUS_ABB}-gDB reference sequences to find
                                        the best match reference to align against. Each sequence will be 
                                        indivindually blasted to find the best reference.
                                    </p>
                                </li>
                                <li>
                                    <a style={{'color':'var(--primary)'}}><i>MAFFT Alignment</i></a>
                                     <br></br>
                                    <p>
                                        Once the best reference has been found, each sequence will be aligned to
                                        it's reference sequence using MAFFT.
                                    </p>
                                </li>
                                <li>
                                   <a style={{'color':'var(--primary)'}}><i>Clade Assignment/Phylogeny Tree</i></a>
                                   <br></br>
                                   <p>
                                    Using USHER, the major and minor clade for each submitted sequence is identified. 
                                    The sequences are then formatted into a phylogeny tree.  
                                   </p>
                                </li>
                            </ol>
                        </p>

                    </div>
                </Tab>

                <Tab eventKey="other" title="other">
                    <p>
                        Taxonium
                        {/* Taxonium */}
                    </p>
                </Tab>
            </Tabs>
            
        </div>
    );
};
 
export default Help;
