import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/dropdown.js';

const Footer = () => {
  return (
    <div>
      <hr></hr>
      <div className="row">
        <div className="col-md-3">
            <a target="_blank" href="http://www.gla.ac.uk/researchinstitutes/iii/cvr/">
              <img style={{"width":"100%"}} alt="CVR logo" src="/footer/cvrBioinformatics.png"/>
            </a>
        </div>

        <div className="col-md-9">
          <p><small>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} is based on the <a target="_blank" href="http://glue-tools.cvr.gla.ac.uk">Viral Genome Toolkit</a> software framework, developed by the 
            <a target="_blank" href="http://www.gla.ac.uk/researchinstitutes/iii/cvr/"> MRC-University of Glasgow Centre for Virus Research</a>, in collaboration with the <a href=""> University of Glasgow 
            Institue of Biodiversity Animal Health and Comparative Medicine</a>, the <a href="">UK Government Animal and Plant Health Agency</a>, and the <a href="">US Centers for Disease Control and Prevention</a>.  
            Contact <a href="">Web Resource Support</a> with questions or feedback.
            <br/><span style={{"color":"#cc2222"}}>Please note this is beta software, still undergoing development and testing before its official release.</span></small>
          </p> 
        </div>
        <div className="row" style={{"padding-top":"5px"}}>
          <div className="col-md-12">
            <p className="text-center">
              <a target="_blank" href="http://www.gla.ac.uk/researchinstitutes/iii/cvr/">
                <img style={{"height":"80px", "padding-left":"0px"}} alt="MRC logo" src="/footer/MRC1.png"/>
              </a>
              <a target="_blank" href="https://www.gla.ac.uk/researchinstitutes/bahcm/">
                <img style={{"height":"65px", "padding-left":"20px"}} alt="IBAHCM logo" src="/footer/IBAHCM.png"></img>
              </a>	
              <a target="_blank" href="https://www.gov.uk/government/organisations/animal-and-plant-health-agency">
                <img style={{"height":"80px", "padding-left":"20px"}} alt="APHA logo" src="/footer/APHA_desat.png"></img>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;