import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import * as phylotree from "phylotree";
import '../../assets/styles/phylotree.css'
// import "phylotree/dist/phylotree.css"; // Make sure CSS is loaded
import { newick } from "./phylogenyTaxonium";

import './tree_test.js'

const PhylogenyTest = () => {

    
  return (
    <div className='container'>
      <h2>Phylogeny Tree Test</h2>
      <div >
                    <div
              aria-labelledby="navbarDropdown"
              id="selection_name_dropdown"
            >
            </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div id="tree_container" class="tree-widget"></div>
        </div>
      </div>
    </div>
  );
};
 
export default PhylogenyTest;


