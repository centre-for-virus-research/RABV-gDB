import React, { useState, useEffect } from "react"
import { Tooltip as ReactTooltip } from "react-tooltip";
import { GlobalMap, useApiEndpoint, useErrorHandler, useLoadingWheelHandler } from '@centre-for-virus-research/gdb-core-package';

const GlobalOverview = () => {

  const url = "/api/statistics/get_global_distribution_of_sequences/"
  const { endpointData, isPending, endpointError } = useApiEndpoint(url);

  const [content, setContent] = useState("");
  // setTooltipContent shows the black bubble with country name and sequences
  // It has to go in here. Not sure why but it doesn't work anywhere else

  const { triggerError } = useErrorHandler();
  const { triggerLoadingWheel } = useLoadingWheelHandler();
  
  useEffect(() => {
    triggerLoadingWheel(isPending)
    if (endpointError) triggerError(endpointError)
  }, [endpointError, isPending]);

  return (
    <div class='container'>
      <h2>Global Sequences Overview</h2>
      <p>Select country or clade to see more information.</p>

      <GlobalMap data={endpointData} setTooltipContent={setContent}></GlobalMap>
      <ReactTooltip id="map-tooltip">{content}</ReactTooltip>

    </div>
  )
}
export default GlobalOverview;
