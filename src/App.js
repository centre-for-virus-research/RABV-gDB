import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/styles/gdb-app-custom.css'

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorMessage, LoadingWheel, NavBar } from "@dana-allen/gdb-core"

import Footer from "./components/Footer"
import Home from "./views/home/home2";
import HowToCite from "./views/about/howToCite";
import Team from "./views/about/team";
import Statistics from "./views/about/statistics";
import Sequences from "./views/explore/sequences/sequences";
import Sequence from "./views/explore/sequences/sequence";
import References from "./views/explore/references/references";
import Reference from "./views/explore/references/reference";
import Mutations from './views/analysis/mutations';


import GlobalOverview from './views/explore/global_overview';

import Alignment from './views/analysis/alignment';


import Api from './views/api/api';
import ApiInfo from './views/api/apiInfo';
import Version from './views/about/version';
import Other from './views/about/other';

import Documentation from './views/documentation';

import AdvancedSearch from './views/explore/advanced_search';

import { ErrorHandlerProvider, LoadingWheelProvider } from "@dana-allen/gdb-core";


function App() {
  return (
    <div className="App">
      
      {
        <ErrorHandlerProvider>
          <LoadingWheelProvider>
            <Router>
              <NavBar /> 
            
              <Routes>

                {/* Homepage */}
                <Route exact path="/"               element={<Home />} />

                {/* Sequences*/}
                <Route exact path="/sequences"      element={<Sequences />} />
                <Route exact path="/sequence/:id"   element={<Sequence />} />
                <Route exact path="/references"     element={<References />} />
                <Route exact path="/reference/:id"  element={<Reference />} />

                {/* About */}
                <Route path="/howToCite"            element={<HowToCite />} />
                <Route path="/team"                 element={<Team />} />
                <Route path="/version"              element={<Version />} />
                <Route path="/other"              element={<Other />} />
                <Route path="/statistics"           element={<Statistics />} />

                {/* API */}
                <Route path="/api"                  element={<Api />} />
                <Route path="/apiInfo/:id"          element={<ApiInfo />} />
                

                {/* Analysis */}
                <Route path="/mutations"            element={<Mutations/>} />
                <Route path="/global_overview"      element={<GlobalOverview />} />
                <Route path="/alignment"            element={<Alignment />} />

                {/* Other */}
                <Route path="/documentation"        element={<Documentation />} />
                <Route path="/advanced_search"      element={<AdvancedSearch />} />

              </Routes>
            </Router>
            <ErrorMessage/>
            <LoadingWheel/>
          </LoadingWheelProvider>
        </ErrorHandlerProvider>
      }
      <div className="container"> 
        <Footer />
      </div>
    </div>
  );
}

export default App;
