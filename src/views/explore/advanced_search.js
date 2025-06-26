import React, { useState } from "react"
import { Tab } from '@centre-for-virus-research/gdb-core-package';
import { AdvancedFilter } from '@centre-for-virus-research/gdb-core-package';

const AdvancedSearch = () => {

  const tabs = [
    { label: "Meta-data Search" },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div class='container'>
      <h2>Advanced Search</h2>
      <p>
        Welcome to {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE}'s advance search. 
        Advanced search provides an interface for searching the {process.env.REACT_APP_VIRUS_ABB} database. 
      </p>
      <p>
        Notes:
        <ul>
          <li>This search allows you to build up queries that support a wide range of custom conditions</li>
          <li>Under Search Conditions, select add more to view all the fields that are available to search through.</li>
        </ul>
      </p>
      <hr></hr>
      <AdvancedFilter></AdvancedFilter>

        {/* <div className="tabs">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              onClick={() =>handleTabClick(index)}
              isActive={index === activeTab}
            />
          ))}
        </div>
        <div style={{'text-align':'left', 'padding-top':'10px', 'width':'100%', 'border-top':'1px solid var(--primary)'}}>
            
          {/* { activeTab == 0 &&
            
            
          } 

            
        </div> */}

      
      

      
    </div>
  )
}


export default AdvancedSearch;
