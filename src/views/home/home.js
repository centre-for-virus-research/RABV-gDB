import React from "react";
import { ReactSVG } from 'react-svg';
import { Modules, ModulesBottom, FunctionCard } from "@dana-allen/gdb-core";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSitemap } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faCapsules } from '@fortawesome/free-solid-svg-icons'
import { faVirus } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faDna } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import '../../assets/styles/cards.css'

// Style Sheets 
import '../../assets/styles/home.css'
library.add(faSitemap, faGear, faCapsules, faVirus, faGlobe, faDna);

const Home = () => {
    return (  
        <div >  
            
            <div >
                <div className="row content banner">
                    <div className="col banner-container banner-gradient-spots">
                        <ReactSVG className='banner-svg' src="home_background.svg" /> 
                        <h1 className='banner-title'><b>RABV-{process.env.REACT_APP_WEB_RESOURCE}</b></h1>
                        <h4 className='banner-subtitle'><b>A <b>G</b>enome <b>D</b>ata<b>b</b>ase Resource for <b>Rab</b>ies <b>V</b>irus</b></h4>
                    </div>

                </div>
            </div>
            <div class="container">
                {/* <Modules />  */}
            </div>




            <div class='row justify-content-center'>
            <div class="card function-card">
            <a href='' class="btn btn-main">
                <FontAwesomeIcon icon={faSitemap} size="3x" />
                <div class="card-body">
                    <h4 class="card-title">Sequences</h4>
                    <p class="card-text" style={{'font-size':'12px'}}>Browse metadata and alignments, arranged into major and minor clades.</p>
                </div>
            </a>
            
        </div>
        <div class="card function-card">
            <a href='' class="btn btn-main">
                <FontAwesomeIcon icon={faSitemap} size="3x" />
                <div class="card-body">
                    <h4 class="card-title">References</h4>
                    <p class="card-text" style={{'font-size':'12px'}}>Browse reference sequences used for alignment.</p>
                </div>
            </a>
            
        </div>
        <div class="card function-card">
            <a href='' class="btn btn-main">
                <FontAwesomeIcon icon={faGlobe} size="3x" />
                <div class="card-body">
                    <h4 class="card-title">Global Visualization</h4>
                    <p class="card-text" style={{'font-size':'12px'}}>Visualize the global distribution with an interactive map.</p>
                </div>
            </a>
            
        </div>


            </div>

            <hr></hr>

            <div class='row justify-content-center'>
            <div class="card function-card">
            <a href='' class="btn btn-main">
                <FontAwesomeIcon icon={faGear} size="3x" />
                <div class="card-body">
                    <h4 class="card-title">Sequence Alignment & Genotyping</h4>
                    <p class="card-text" style={{'font-size':'12px'}}>Tool providing genotyping analysis and visualisation of submitted FASTA sequences.</p>
                </div>
            </a>
            
        </div>
        <div class="card function-card">
            <a href='' class="btn btn-main">
                <FontAwesomeIcon icon={faDna} size="3x" />
                <div class="card-body">
                    <h4 class="card-title">Mutations</h4>
                    <p class="card-text" style={{'font-size':'12px'}}>Browse reference sequences used for alignment.</p>
                </div>
            </a>
            
        </div>
    

            </div>





















            <div>

                
 
            </div>
            
            <hr></hr>

            <div className="container">
                <p>
                    Rabies virus (RABV) is a neglected zoonotic disease that causes around 59,000
                    human deaths each year, with a near 100% mortality rate after the onset of symptoms. 
                    The virus is a member of the Lyssavirus genus, within the Rhabdoviridae family, which
                    is characterised by a single stranded, negative-sense RNA genome.
                </p>
                <p>         
                    Infection with RABV can occur in all species of mammal, but up to 99% of human
                    rabies cases arise from bites from infected domestic dogs. Vaccinating dogs
                    to interrupt transmission is therefore paramount, and a major focus of the
                    ‘Zero by 30’ global strategy to eliminate human deaths from dog-mediated rabies
                    by 2030.
                </p>
                <p>
                    RABV-{process.env.REACT_APP_WEB_RESOURCE} is a data-centric bioinformatics resource which organises RABV genome sequence data along evolutionary lines. 
                    RABV-{process.env.REACT_APP_WEB_RESOURCE} aims to leverage new and existing RABV sequences in order to improve our understanding of the epidemiology and pathology of RABV.
                </p>
                
                <p>
                    The web version of RABV-{process.env.REACT_APP_WEB_RESOURCE} can be used for basic analysis. An offline version of the resource 
                    can be used for more advanced work.
                </p>
                <p>	   
                    <b>NOTE</b>: we do not store any sequences submitted to RABV-{process.env.REACT_APP_WEB_RESOURCE}!	   
                </p>
            </div>
            <hr></hr>

            <div className="container">
                <p>Welcome to RABV-gDB! This is an updated version of XXXX. RABV-Glue will no longer be accessible by XXX date. </p>
                <p>What's new:</p>
                <ul>
                    <li><Link className='gdb-link' to="/api"><b>API</b></Link> A new 'easy-to-use' API that allows users to access RABV data locally without installing the database.</li>
                    <li><Link className='gdb-link' to="/global_overview" ><b>Global Overview</b></Link>: An interactive, searchable world map of all sequences. </li>
                    <li><Link className='gdb-link' to="/statistics"><b>Statistics:</b></Link> Overview of the data stored in RABV-gDB</li>
                    <li><Link className='gdb-link' to="/advanced_search"><b>Advanced Search:</b></Link> Provides an interface for searching the {process.env.REACT_APP_VIRUS_ABB} database with customizable conditions.</li>
                </ul>
            </div>
            <hr></hr>
            <div className="container">
                <div className='row'>
                    <ModulesBottom />
                </div>
            </div>
      </div> 
    );
};
 
export default Home;