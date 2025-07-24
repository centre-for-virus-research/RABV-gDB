import React from "react";
 
import { Tabs, Tab } from 'react-bootstrap';

const Help = () => {
    return (
        <div class="container ">
            <h2>Help</h2>

            <Tabs defaultActiveKey="mutations" id="tabs" className="mb-3">
                <Tab eventKey="mutations" title="Mutations">
                    <p>
                        Taxonium
{/* Taxonium */}


                    </p>
                </Tab>
                <Tab eventKey="alignment" title="Sequence Alignment">
                    <p>

                    </p>
                </Tab>
            </Tabs>
            
        </div>
    );
};
 
export default Help;
