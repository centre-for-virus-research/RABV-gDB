import React, { useState, useCallback, useEffect } from "react"
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Button, ButtonGroup } from 'react-bootstrap';
import { GlobalMap, useFilterParams,  submitApiQuery, useApiEndpoint, useErrorHandler, useLoadingWheelHandler, SequencesFilter } from '@centre-for-virus-research/gdb-core-package';
import { Link } from 'react-router-dom';
const GlobalOverview = ({ filters=null }) => {

  const [params, setParams] = useFilterParams(filters);
  const url = params ? "/api/statistics/get_global_distribution_of_sequences/" : 
                        "/api/statistics/get_global_distribution_of_sequences/";
  const { endpointData, isPending, endpointError } = useApiEndpoint(url, params);

  const [content, setContent] = useState("");
  const [data, setData] = useState([])
  const [showFilter, setShowFilter] = useState(false);
  // setTooltipContent shows the black bubble with country name and sequences
  // It has to go in here. Not sure why but it doesn't work anywhere else

  const { triggerError } = useErrorHandler();
  const { triggerLoadingWheel } = useLoadingWheelHandler();
  
  useEffect(() => {
    triggerLoadingWheel(isPending)
    if (endpointError) triggerError(endpointError)
      if (endpointData) setData(endpointData);
  }, [endpointError, isPending]);

  const handleData = async (data) => {
    if (data.status === 200){
        const json = await data.json();  
        setData(json)
    }
}
  const handleFiltersChange = useCallback((data) => {
      setParams(data)
      const queryString = data ? new URLSearchParams(data).toString():null;
      const fullUrl = `${process.env.REACT_APP_BACKEND_URL}${'/api/statistics/get_global_distribution_of_sequences/'}${queryString ? `?${queryString}` : ''}`;
      submitApiQuery(fullUrl, false, handleData)
      setShowFilter(false);
  }, []);
  const [country, setCountry] = useState('')

  const handleCountry = (e) => { setCountry(e) }

  return (
    <div class='container'>
      <h2>Global Sequences Overview</h2>
      <p>Select country or clade to see more information.</p>
      <p>Explore sequences for:<Link className='custom-link' to={`/sequences`} state={{ filters: {...params, ["country"]: country} }}> {country}</Link></p>
      <div className='col right-align' >
        <ButtonGroup>
            <Button className="paging-buttons" onClick={() => setShowFilter(true)}> Filters </Button>
        </ButtonGroup>   
      </div>
      <SequencesFilter show={showFilter} onFilterSelect={handleFiltersChange} onClose={() => setShowFilter(false)}/>

      <GlobalMap data={data} setTooltipContent={setContent} countryClicked={handleCountry}></GlobalMap>
      <ReactTooltip id="map-tooltip">{content}</ReactTooltip>

    </div>
  )
}
export default GlobalOverview;
