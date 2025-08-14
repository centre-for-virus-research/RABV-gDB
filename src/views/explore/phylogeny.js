import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import * as phylotree from "phylotree";
import '../../assets/styles/phylotree.css'
// import "phylotree/dist/phylotree.css"; // Make sure CSS is loaded


const Phylogeny = () => {
    const containerRef = useRef(null);
    const treeRef = useRef(null);
    const onTreeUpdate = useRef(() => {}); // store your callback

    const newick = "((((Pig:0.147969,Cow:0.21343):0.085099,Horse:0.165787,Cat:0.264806):0.058611, ((RhMonkey{Foreground}:0.002015,Baboon{Foreground}:0.003108){Foreground}:0.022733 ,(Human{Foreground}:0.004349,Chimp{Foreground}:0.000799){Foreground}:0.011873):0.101856) :0.340802,Rat:0.050958,Mouse:0.09795)"
    const newick2 =
    "(((EELA:0.150276,CONGERA:0.213019):0.230956,(EELB:0.263487,CONGERB:0.202633):0.246917):0.094785,((CAVEFISH:0.451027,(GOLDFISH:0.340495,ZEBRAFISH:0.390163):0.220565):0.067778,((((((NSAM:0.008113,NARG:0.014065):0.052991,SPUN:0.061003,(SMIC:0.027806,SDIA:0.015298,SXAN:0.046873):0.046977):0.009822,(NAUR:0.081298,(SSPI:0.023876,STIE:0.013652):0.058179):0.091775):0.073346,(MVIO:0.012271,MBER:0.039798):0.178835):0.147992,((BFNKILLIFISH:0.317455,(ONIL:0.029217,XCAU:0.084388):0.201166):0.055908,THORNYHEAD:0.252481):0.061905):0.157214,LAMPFISH:0.717196,((SCABBARDA:0.189684,SCABBARDB:0.362015):0.282263,((VIPERFISH:0.318217,BLACKDRAGON:0.109912):0.123642,LOOSEJAW:0.397100):0.287152):0.140663):0.206729):0.222485,(COELACANTH:0.558103,((CLAWEDFROG:0.441842,SALAMANDER:0.299607):0.135307,((CHAMELEON:0.771665,((PIGEON:0.150909,CHICKEN:0.172733):0.082163,ZEBRAFINCH:0.099172):0.272338):0.014055,((BOVINE:0.167569,DOLPHIN:0.157450):0.104783,ELEPHANT:0.166557):0.367205):0.050892):0.114731):0.295021)";


   
  useEffect(() => {
    if (!newick) return;



    containerRef.current.innerHTML = "";

    const tree = new phylotree.phylotree(newick);
  
    treeRef.current = tree;

    tree.render({
      container: containerRef.current,
      height: 600,
      width: 800,
      "left-right-spacing": "fit-to-size",
      "top-bottom-spacing": "fit-to-size",
    });

    tree.display.selectionLabel('Foreground')
    
    // THIS LINE MUST BE HERE TO SHOW THE TREE
    containerRef.current.appendChild(tree.display.show()); 


    // containerRef.current.querySelectorAll(`.internal-node`)
    //                 .forEach((label) => {
    //                   console.log(label)
    //                 });






    // This chunk of code removes the pre-defined click listener for the node
    const labelClass = tree.display.css_classes["node_text"]; //package class for node
    containerRef.current.querySelectorAll(`.${labelClass}`)
                        .forEach((label) => {
                          d3.select(label).on("click", null); // removes the original listener
                        });

    containerRef.current.querySelectorAll("circle")
                        .forEach((circle) => {
                          d3.select(circle).on("click", null); // remove the original D3 click
                          circle.onclick = (e) => {
                            e.stopPropagation(); 
                            const nodeData = d3.select(e).datum(); // <-- gets the bound node
                            handleNodeClick(e, e.target.__data__); // your custom handler
                          };
                        });
   


    // This chunk replaces click listener on node with custom one
    const rebindClickHandlers = () => {
      const labelClass = tree.display.css_classes["node_text"];
      containerRef.current
        .querySelectorAll(`.${labelClass}`)
        .forEach((label) => {
          label.onclick = (e) => {
            e.stopPropagation(); // prevents old one from triggering
            const nodeName = label.textContent;
            handleHighlight(nodeName);
          };
        });

        containerRef.current
  .querySelectorAll("circle")
  .forEach((circle) => {
    const nodeData = d3.select(circle).datum();
    const parentG = d3.select(circle.parentNode); // <g> that contains the circle

    // Remove any previous labels to avoid duplicates
    parentG.selectAll(".internal_label").remove();

    // Append your label
    parentG
      .append("text")
      .classed("internal_label", true)
      .text("Hello") // Or nodeData.name if you want the actual name
      .attr("dx", ".4em")
      .attr("dy", ".3em")
      .style("font-style", "italic")
      .style("font-size", "10px")
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle");

        
    });
  }

    // Initial bind
    rebindClickHandlers();

    // These need to be here for some reason -- not totally sure why TBH
    // Patch refresh and update to trigger your callback
    const originalRefresh = tree.display.refresh.bind(tree.display);
    tree.display.refresh = (...args) => {
      originalRefresh(...args);
      rebindClickHandlers();
      onTreeUpdate.current();
    };
    const originalUpdate = tree.display.update.bind(tree.display);
    tree.display.update = (...args) => {
      originalUpdate(...args);
      rebindClickHandlers();
      onTreeUpdate.current();
    };
    // handleHighlightNew()

  }, [newick]);

  // -- THIS CODE ISN'T NEEDED -- it runs when the page is reloaded
  // useEffect(() => {
  //   onTreeUpdate.current = () => {
  //     console.log("Tree updated or refreshed");
  //     handleHighlightNew()
  //   };
  // }, []);

  const handleHighlight = (nodeName) => {
    const tree = treeRef.current;
    if (!tree) return;
    const node = tree.getNodeByName(nodeName);
    if (node) tree.display.modifySelection(tree.pathToRoot(node));
    const labelClass = tree.display.css_classes["selected-branch"]; //package class for node
    containerRef.current.querySelectorAll(`.${labelClass}`)
                        .forEach((label) => {label.classList.add("branch-selected-2");});
  };

  const handleNodeClick = (element, node) => {
    const tree = treeRef.current;
    if (!tree) return;
    // console.log(node)
    tree.display.toggleCollapse(node).update()

  };
    
  return (
    <div className='container'>
      <h2>Phylogeny Tree</h2>
      <div ref={containerRef} />
    </div>
  );
};
 
export default Phylogeny;



 // const handleHighlight = () => {
    //   const tree = treeRef.current;
    //   if (!tree) return;

    //   // Get path from the highlighted node to root
    //   const pathNodes = tree.pathToRoot(tree.getNodeByName(highlightedNode));

    //   // Highlight them by setting "highlight" attribute to true
    //   tree.display.modifySelection(pathNodes);
    //   tree.display.update();
    // };

    // Original Tree building
    // useEffect(() => {
    //   if (!newick) return;

    //     // Clear previous tree
    //     containerRef.current.innerHTML = "";

    //     // Initialize tree
    //     const tree = new phylotree.phylotree(newick);
    //     treeRef.current = tree;


    //     // Render tree
    //     tree.render({
    //         container: containerRef.current,
    //         height: 600,
    //         width: 800,
    //         "left-right-spacing": "fit-to-size",
    //         "top-bottom-spacing": "fit-to-size",
    //     });

        
    //     // This line must be here to show the tree
    //     containerRef.current.appendChild(tree.display.show());


    //     // Add click listener to every node label
    //     d3.select(containerRef.current)
    //     .selectAll(`.${tree.display.css_classes["node_text"]}`)
    //     .on("click", function (event, d) {
    //       event.stopPropagation(); // prevent bubbling
    //       handleHighlight(d); // your custom handler
    //     });

    // }, [newick]);