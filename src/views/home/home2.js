import React, {useState} from "react";
import { ReactSVG } from 'react-svg';
import { Modules, ModulesBottom, FunctionCard } from "@centre-for-virus-research/gdb-core-package";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSitemap } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faCapsules } from '@fortawesome/free-solid-svg-icons'
import { faVirus } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faDna, faToolbox } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import '../../assets/styles/cards.css'

// Style Sheets 
import '../../assets/styles/home.css'
library.add(faSitemap, faGear, faCapsules, faVirus, faGlobe, faDna, faToolbox);


const tabs = ["Explore", "Analysis", "About"];

const exploreItems = [
  { title: "Sequences", description: "Browse metadata and alignments, arranged into major and minor clades.", icon: faSitemap, link:'/sequences' },
  { title: "References", description: "Browse reference sequences used for alignment.", icon: faSitemap, link:'/references' },
  { title: "Global Visualization", description: "Visualize the global distribution with an interactive map." , icon: faGlobe, link:'/global_overview'}
];

const analysisItems = [
  { title: "Sequence Genotyping", description: "Tool providing genotyping analysis and visualisation of submitted FASTA sequences.", icon: faGear, link:'/alignment' },
  { title: "Mutations", description: "Identify mutations among different hosts.", icon: faDna, link:'/mutations' }
];

const aboutItems = [
    { title: "Team", description: "Meet the team that created RABV-gDB", icon: faGear, link:'/team' },
    { title: "Statistics", description: "View the data statistics", icon: faDna, link:'/statistics' },
    { title: "Viral Genome Toolkit", description: "Checkout the software to build your own database", icon: faToolbox, link:'/statistics' }
  ];

const Home = () => {

    const [activeTab, setActiveTab] = useState('');

  const renderCards = (items) => (
    <div className="row justify-content-center">
      {items.map((item, index) => (
        <div class="card function-card">
        <a href={item.link} class="btn btn-main">
            <FontAwesomeIcon icon={item.icon} size="3x" />
            <div class="card-body">
                <h4 class="card-title">{item.title}</h4>
                <p class="card-text" style={{'font-size':'14px'}}>{item.description}</p>
            </div>
        </a>
        
    </div>

      ))}
    </div>
  );


    return (  
        <div >  
            
            <div >
                <div className="row content banner">
                    <div className="col banner-container banner-gradient-spots">
                        <ReactSVG className='banner-svg' src="/home_background.svg" /> 
                        <h1 className='banner-title'><b>RABV-{process.env.REACT_APP_WEB_RESOURCE}</b></h1>
                        <h4 className='banner-subtitle'><b>A <b>G</b>enome <b>D</b>ata<b>b</b>ase Resource for <b>Rab</b>ies <b>V</b>irus</b></h4>
                    </div>

                </div>
            </div>
            <div class="container">
                {/* <Modules />  */}
            


            <div class='row justify-content-center'>
            <nav className="d-flex justify-content-center bg-white rounded-pill overflow-hidden">
            {tabs.map((tab, index) => {
                const isActive = activeTab === tab;
                
                return (
                    <Button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-fill border-0 py-2 px-3 btn btn-main
                        ${isActive ? 'btn-main-filled' : 'bg-white secondary-color'}
                        ${index === 0 ? 'rounded-start-pill' : ''}
                        ${index === tabs.length - 1 ? 'rounded-end-pill' : ''}
                        ${index > 0 && index < tabs.length - 1 ? 'rounded-0' : ''}
                        ${index !== 0 ? 'border-start border-secondary' : ''}`}
                    style={{ minWidth: '33%'}}
                    >
                    <h3>{tab}</h3>
                    </Button>

                );
            })}
            </nav>


            </div>
            </div>

            {/* Tab Content */}
            <div ></div>
            <div className="container">
                {activeTab === "Explore" && renderCards(exploreItems)}
                {activeTab === "Analysis" && renderCards(analysisItems)}
                {activeTab === "About" && renderCards(aboutItems)}
            </div>

            
            <hr></hr>

            {/*<div className="container">
                 <div className='row' >
                    <div className='col-5' style={{
    background: '#f8f9fa', // light grey/white background
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    float:'left'
  }}>
                        <h4 style={{color:'var(--primary)'}}>What is Rabies?</h4>
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

                    </div>
                    <div className='col-1'></div>
                    <div className='col-5' style={{
    background: '#f8f9fa', // light grey/white background
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    float:'right'
  }}>
                         <h4 style={{color:'var(--primary'}}>Why RABV-gDB?</h4>
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

                </div>
                
            </div> */}

            <div className="container">
                <div style={{
                    background: '#f8f9fa', // light grey/white background
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px',
                }}>
                <h4 style={{color:'var(--primary)'}}>What is Rabies?</h4>
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
                </div>
                <div style={{
                    background: '#f8f9fa', // light grey/white background
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px',
                }}>
                <h4 style={{color:'var(--primary'}}>Why RABV-gDB?</h4>
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
            </div>



            {/* <div className="container">
                <div className='row'>
                    <ModulesBottom />
                </div>
            </div> */}
      </div> 
    );
};
 
export default Home;