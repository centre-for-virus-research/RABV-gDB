import React from "react"


const Documentation = () => {

  return (
    <div class='container'>
        <h2>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} Documentation</h2>

        <p>
            RABV-gDB is built using a modular architecture to promote code reusability across multiple projects. 
            The web resource consists of two main parts:
        </p>

        <ol>
            <li>
                <h4>RABV-gDB React App</h4>
                <ul>
                    <li>
                        This app acts as the primary web interface that connects to the V-gDB API 
                        and displays the data.
                    </li>
                    <li>
                        It handles the overall page layout, routing, and 
                        major API requests.
                    </li>
                </ul>
            </li>
            <li>
                <h4>core-gDB Component Package</h4>
                <ul>
                    <li>
                        The core functionality and reusable components (such as tables, charts, 
                        filters, and data viewers) are bundled into a separate React package.
                    </li>
                    <li>
                        This package is imported into the main app to keep the codebase clean 
                        and consistent across different applications.
                    </li>
                    <li>
                        If you wish to develop/edit the core-gDB package, you must download and
                        import it. Otherwise, you can use the package that we created
                    </li>
                </ul>
            </li>
        </ol>

        <h3>How It Works During Local Development</h3>
        <p>
            If you're setting up the web resource locally, you'll need to clone both the 
            main app and the component package repositories. The component package must be 
            installed locally into the main app using tools like npm link or by installing 
            the package directly from a local folder. Any changes made to the component 
            package will automatically reflect in the main app during development. This 
            setup ensures that multiple apps can share the same components without code 
            duplication, making the system easier to maintain and extend.
        </p>

    

        <h3>RABV-gDB Web Resource</h3>
            
        <p>
            This is the react web-app that runs the RABV-gDB GUI. You need to have 
            node.js installed.
        </p>
        <p>Download the RABV-gDB github repository</p>
        <pre><code>$ git clone git@github.com:dana-allen/RABV-gDB.git</code></pre>
        
        <p>Install RABV-gDB node_modules</p>
        <pre><code>$ cd RABV-gDB</code></pre>
        <pre><code>$ npm install</code></pre>
        <pre><code>$ npm start</code></pre>
    
        <p>Navigate to <a href="http://localhost:3000">http://localhost:3000</a> to explore RABV-gDB web resource!</p>
        
        <h3>gDB-core</h3>
        <p>This step is only necessary if you wish to edit the components declared in this pacakge.</p>

        <p>This is the gDB core package built in React that contains all the React components that </p>
        <pre><code>$ git clone git@github.com:dana-allen/core-gDB.git</code></pre>

        <pre><code>$ cd core-gDB</code></pre>
        <pre><code>$ npm install</code></pre>
        <pre><code>$ npm link</code></pre>
        <pre><code>$ npm run watch</code></pre>
        
        <p>Inside your RABV-gDB directory:</p>
        <pre><code>$ npm link @dana-allen/core-gdb</code></pre>




        <h3>gDB Backend</h3>

        <p>
            The V-gDB web resources are designed to be integrated with the V-gDB backend Django project.
            If you wish to customize the API or use your own database, you must install the V-gDB backend
            and configure the v-gDB web resource to use your local backend.
        </p>

        <p>
            This is the code base that hosts the backend functions and API. It is a Django project
        </p>

        <p>git clone #TODO: add in github link</p>
        <p>cd RABV-gDB</p>
        <p>npm install</p>
        <p>npm start</p>
        <p>navigate to localhost:3000</p>

      
    </div>
  )
}
export default Documentation;
