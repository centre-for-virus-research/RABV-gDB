import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import * as phylotree from "phylotree";
import '../../assets/styles/phylotree.css'
// import "phylotree/dist/phylotree.css"; // Make sure CSS is loaded
import { newick } from "./phylogenyTaxonium";

import './tree_test.js'

const Phylogeny = () => {
  const containerRef = useRef(null);
  const treeRef = useRef(null);
  const onTreeUpdate = useRef(() => {}); // store your callback
  let selection_set = []
  // const newick = "((((Pig:0.147969,Cow:0.21343):0.085099,Horse:0.165787,Cat:0.264806):0.058611, ((RhMonkey:0.002015,Baboon:0.003108){Foreground}:0.022733 ,(Human:0.004349,Chimp:0.000799):0.011873):0.101856) :0.340802,Rat:0.050958,Mouse:0.09795)"
  

  // function node_colorizer(element, data) {
  //   try {
  //     var count_class = 0;

  //     selection_set.forEach(function(d, i) {
  //       if (data[d]) {
  //         count_class++;
  //         element.style(
  //           "fill",
  //           color_scheme(i),
  //           i == current_selection_id ? "important" : null
  //         );
  //       }
  //     });

  //     if (count_class > 1) {
  //     } else {
  //       if (count_class == 0) {
  //         element.style("fill", null);
  //       }
  //     }
  //   } catch (e) {}
  // }

  const handleHighlight = (nodeName) => {
    const tree = treeRef.current;
    if (!tree) return;
    const node = tree.getNodeByName(nodeName);
    if (node) tree.display.modifySelection(tree.pathToRoot(node));
    const labelClass = tree.display.css_classes["selected-branch"]; //package class for node
    containerRef.current.querySelectorAll(`.${labelClass}`)
                        .forEach((label) => {label.classList.add("branch-selected-2");});
    console.log(node)
  };
  let color_scheme = d3.scaleOrdinal(d3.schemeCategory10)

  const handleNodeClick = (element, node) => {
    const tree = treeRef.current;
    if (!tree) return;
    tree.display.toggleCollapse(node).update()
    console.log(node)
  };

  

  
  useEffect(() => {
    containerRef.current.innerHTML = "";
    const tree = new phylotree.phylotree(newick);
    treeRef.current = tree;

    function update_selection_names(id, skip_rebuild) {
        skip_rebuild = skip_rebuild || false;
        id = id || 0;

        let current_selection_name = selection_set[id];
        let current_selection_id = id;

        if (!skip_rebuild) {
          d3.selectAll(".selection_set").remove();

          d3.select("#selection_name_dropdown")
            .selectAll(".selection_set")
            .data(selection_set)
            .enter()
            .append("a")
            .attr("class", "selection_set dropdown-item")
            .attr("href", "#")
            .text(function(d) {
              return d;
            })
            .style("color", function(d, i) {
              return color_scheme(i);
            })
            .on("click", function(d, name) {
              // Pass the index of name
              let i = selection_set.indexOf(name);
              update_selection_names(i, true);
            });
        }

        d3.select("#selection_name_box")
          .style("color", color_scheme(id))
          .property("value", current_selection_name);

        // Loop through all selection_sets
        selection_set.forEach((value, idx) => {
          console.log(value)
          tree.display.selectionLabel(value); // same as id in lodash version
          tree.display.update();
        });
         

        //console.log('Setting label within the tree display');
        //console.log(id);
        //console.log(selection_set[id]);
        tree.display.selectionLabel(selection_set[id]);
        tree.display.update();
      }

    tree.render({
      container: containerRef.current,
      // height: 600,
      // width: 800,
      // "left-right-spacing": "fit-to-size",
      // "top-bottom-spacing": "fit-to-size",
    });
    
    if (tree.parsed_tags.length) {
      selection_set = tree.parsed_tags;
    }

    update_selection_names()
    console.log(selection_set)

    // selection_set.forEach(d => {tree.display.selectionLabel(d).update();});
    // tree.display.update();
    // tree.display.selectionLabel(current_selection_name);


    // THIS LINE MUST BE HERE TO SHOW THE TREE
    containerRef.current.appendChild(tree.display.show()); 
    
    // const removeOriginalListeners = () => {

    //   // This chunk of code removes the pre-defined click listener for the leaf
    //   const labelClass = tree.display.css_classes["node_text"]; //package class for node
    //   containerRef.current.querySelectorAll(`.${labelClass}`)
    //                       .forEach((label) => {
    //                         d3.select(label).on("click", null); // removes the original listener
    //                       });

    //   // This chunk of code removes the pre-defined click listener for the node
    //   containerRef.current.querySelectorAll("circle")
    //                       .forEach((circle) => {
    //                         d3.select(circle).on("click", null); // remove the original D3 click
    //                         circle.onclick = (e) => {
    //                           e.stopPropagation(); 
    //                           handleNodeClick(e, e.target.__data__); 
    //                         };
    //                       });
      
    //   // Removes listeners on branches
    //   containerRef.current.querySelectorAll(`.branch`)
    //                     .forEach((label) => {
    //                       d3.select(label).on("click", null); // removes the original listener
    //                     });
    // };

    // // This chunk replaces click listener on node with custom one
    // const rebindClickHandlers = () => {
    //   const labelClass = tree.display.css_classes["node_text"];
    //   containerRef.current
    //     .querySelectorAll(`.${labelClass}`)
    //     .forEach((label) => {
    //       label.onclick = (e) => {
    //         e.stopPropagation(); // prevents old one from triggering
    //         const nodeName = label.textContent;
    //         handleHighlight(nodeName);
    //       };
    //     });

    //   containerRef.current.querySelectorAll("circle")
    //                       .forEach((circle) => {
    //                         const nodeData = d3.select(circle).datum();
    //                         const parentG = d3.select(circle.parentNode); // <g> that contains the circle

    //                         // Remove any previous labels to avoid duplicates
    //                         parentG.selectAll(".internal_label").remove();

    //                         // Append your label
    //                         parentG.append("text")
    //                                 .classed("internal_label", true)
    //                                 .text(nodeData.id) // Or nodeData.name if you want the actual name
    //                                 .attr("dx", ".4em")
    //                                 .attr("dy", ".3em")
    //                                 .style("font-style", "italic")
    //                                 .style("font-size", "10px")
    //                                 .attr("text-anchor", "start")
    //                                 .attr("alignment-baseline", "middle");
    //                       });
    // }

    // removeOriginalListeners();
    // rebindClickHandlers();

    // // These need to be here for some reason -- they reapply the listener logic when the tree is remade
    // // Patch refresh and update to trigger your callback
    // const originalRefresh = tree.display.refresh.bind(tree.display);
    // tree.display.refresh = (...args) => {
    //   originalRefresh(...args);
    //   removeOriginalListeners();
    //   rebindClickHandlers();
    //   onTreeUpdate.current();
    // };
    // const originalUpdate = tree.display.update.bind(tree.display);
    // tree.display.update = (...args) => {
    //   originalUpdate(...args);
    //   removeOriginalListeners();
    //   rebindClickHandlers();
    //   onTreeUpdate.current();
    // };

    // tree.display.toggleCollapse(sectionLabels).update()
    // tree.display.selectionLabel('Foreground')
    // let currentNode = d3.select(containerRef.current)
    //                     .selectAll("circle")
    //                     .filter(d => d.Foreground)
    //                     .datum()

    // const parentIds = getParentIds(currentNode)
    // const childIds = getChildIds(currentNode);
    // const nodesToToggle = [];
    // console.log(parentIds)
    // console.log(childIds)
    // d3.select(containerRef.current)
    //   .selectAll("circle")
    //   .each(function(d) {
    //     if (![...parentIds, ...childIds].includes(d.id)) {
    //       nodesToToggle.push(d);
    //   }
    // if (d.collapsed) {

    // }
    // else if (!parentIds.includes(d.id)) {    // only toggle nodes whose id is NOT in parentIds
    //   console.log("INSIDE HERE")
    //   console.log(d)
    //   tree.display.toggleCollapse(d).update();
    //   console.log("Collapsed now")
    // }
  // });

  // nodesToToggle.sort((a, b) => b.depth - a.depth) // deeper nodes first
  //               .forEach(d => {tree.display.toggleCollapse(d).update();});
  
  // containerRef.current
  //       .querySelectorAll(`.clade`)
  //       .forEach((label) => {label.style.fill = "green"; label.style.stroke = "green"});
  
  // handleHighlight('Baboon')
  update_selection_names();
  }, [newick]);
function getParentIds(node) {
  const ids = [];
  ids.push(node.id)
  let current = node.parent; // start at parent
  while (current) {
    ids.push(current.id);
    current = current.parent; // move up
  }
  return ids;
}


function getChildIds(node) {
  const ids = [];
  function traverse(n) {
    ids.push(n.id);
    if (n.children) {
      n.children.forEach(traverse);
    }
  }
  traverse(node);
  return ids;
}

    
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