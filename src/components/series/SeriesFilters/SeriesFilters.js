import React, { useState, useEffect, useMemo, memo } from "react";

// import styles
import styles from "./SeriesFilters.module.css";

// import material-ui
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CustomToggle from "../../_common/CustomToggle/CustomToggle";
import Search from "../Search/Search";

// import base popup for testing
import AddSeriesPopup from "../../popups/AddSeriesPopup/AddSeriesPopup";

import { Plus } from "tabler-icons-react";
import toast, { Toaster } from "react-hot-toast";

function SeriesFilters(props) {


  function alertError(message) {
    toast.error(message, {
        style: {
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
        },
        position: "top-center",
    });
}

function alertSuccess(message) {
    toast.success(message, {
        style: {
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
        },
        position: "top-center",
    });
}


  // is new series dialog open?
  const [newSeriesDialogOpen, setNewSeriesDialogOpen] = useState(false);

  // define a state variable to hold series to display as options

  const [seriesOptions, setSeriesOptions] = useState([]);

  // state var to hold start and end years as passed in from props
  const [startYear, setStartYear] = useState(props.startYear);
  const [endYear, setEndYear] = useState(props.endYear);

  let hideSoldOut = props.hideSoldOut;
  let setHideSoldOut = props.setHideSoldOut;

  // handle changes in props.endYear and props.startYear
  useEffect(() => {
    setStartYear(props.startYear);
    setEndYear(props.endYear);
  }, [props.startYear, props.endYear]);

  // get the state var seriesList and the function to update it) from the props
  let seriesList = props.seriesList;
  let setSeriesList = props.setSeriesList;
  const memoizedSeriesOptions = useMemo(
    () => props.seriesOptions,
    [props.seriesOptions]
  );

  useEffect(() => {
    // when seriesList prop changes, set the value of seriesList to the value of the prop
    setSeriesList(props.defaultSeries);
  }, [props.defaultSeries]);

  useEffect(() => {
    // make sure each entry in  memoizedSeriesOptions  is unique
    const uniqueSeriesOptions = [...new Set(memoizedSeriesOptions)];
    setSeriesOptions(uniqueSeriesOptions);
  }, [memoizedSeriesOptions]);

  const handleAutocompleteChange = (event, value) => {
    setSeriesList(value);
    // scroll down 1 px and back up to trigger the lazyload component
    window.scrollBy(0, 1);
    window.scrollBy(0, -1);
  };




 

  return (
    <div className={styles["series-filters"]} id="series-filters">
      <div className={`${styles["top"]} row w-100`}>
        <div className="col-sm-12 col-md-6 mb-3 p-0">
          <div className="d-flex flex-row">
            <Autocomplete
              sx={{
                width: 300,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
              }}
              multiple
              id="tags-outlined"
              options={seriesOptions}
              getOptionLabel={(option) => option}
              onChange={handleAutocompleteChange}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder="Filter by series" />
              )}
              size="small"
            />

            <div className={`${styles["add-series-btn"]} d-flex justify-content-center align-center`}>
              <Plus size={25} strokeWidth={1} 
              onClick={() => {
                setNewSeriesDialogOpen(true);
              }}
              />
            </div>

                {newSeriesDialogOpen && (
                  <AddSeriesPopup
                    closePopup={() => {
                      setNewSeriesDialogOpen(false);
                    }}
                    alertError={alertError}
                    alertSuccess={alertSuccess}
                  />
                )}




            

          </div>
          <div className={`${styles["hide-sold-out"]} d-flex flex-row justify-content-start align-center`}>
            <span className={styles["hide-sold-out-text"]}>Hide Sold Out</span>
            <CustomToggle
              checked={hideSoldOut}
              onChange={() => {
                setHideSoldOut(!hideSoldOut);
                console.log("hideSoldOut: ", hideSoldOut);
              }}
              label="Hide Sold Out"
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-6 d-flex justify-content-end p-0">
          <Search
            searchQuery={props.searchQuery}
            setSearchQuery={props.setSearchQuery}
            seriesOptions={props.seriesOptions}
            setSeriesOptions={props.setSeriesOptions}
            seriesList={props.seriesList}
            setSeriesList={props.setSeriesList}
            seriesInfo={props.seriesInfo}
            setSeriesInfo={props.setSeriesInfo}
          />
        </div>
      </div>

      <div className={styles["bottom"]}>{/* other content */}</div>
    </div>
  );


}
export default SeriesFilters;
