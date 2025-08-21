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
              <div class="dropdown-divider"></div>
            </div>
                <ul class="nav navbar-nav mx-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Tag
            </a>

          </li>
        </ul>
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


