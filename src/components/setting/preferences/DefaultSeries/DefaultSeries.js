import React, { useEffect, useState } from "react";
import styles from "./DefaultSeries.module.css";
import { Autocomplete, TextField } from "@mui/material";

function DefaultSeries(props) {
  const setDataToSave = props.setDataToSave;
  const existingData = props.existingData.preferences;
  const changeHasBeenMade = props.changeHasBeenMade;
  const setChangeHasBeenMade = props.setChangeHasBeenMade;
  const [seriesNames, setSeriesNames] = useState([]);
  const [defaultSeries, setDefaultSeries] = useState([]);


  function updateDefaultSeries() {
    setDataToSave((prevState) => ({
      ...prevState,
      preferences: {
        ...prevState.preferences,
        defaultSeries: getUpdatedList(),
      },
    }));
  }

  useEffect(() => {
    updateDefaultSeries();
    if (!changeHasBeenMade) {
      setChangeHasBeenMade(true);
    }
  }, [defaultSeries]);

  function populateWithExistingData() {
    if (existingData.defaultSeries) {
        // format the data to match the format of the autocomplete
        let existingDataFormatted = [];
        for (let i = 0; i < existingData.defaultSeries.length; i++) {
            existingDataFormatted.push({
                content: existingData.defaultSeries[i].series,
                id: existingData.defaultSeries[i].series_id,
            });
        }
      setDefaultSeries(existingDataFormatted);
    }
  }

  function getSeriesNames() {
    let seriesNames = [];

    // get from local storage
    let seriesList = JSON.parse(localStorage.getItem("seriesInfo"));
    for (let i = 0; i < seriesList.length; i++) {
      seriesNames.push({
        content: seriesList[i].series,
        id: seriesList[i].seriesID,
      });
    }

    return seriesNames;
  }

    function getUpdatedList() {
       const format = {
        series_id : 1, // series_id (id in the autocomplete)
        series : "series", // series name (content in the autocomplete)
       }
         let updatedList = [];
        
         for (let i = 0; i < defaultSeries.length; i++) {
                updatedList.push({
                    ...format,
                    series_id: defaultSeries[i].id,
                    series: defaultSeries[i].content,
                });
            }

        return updatedList;
    }

  
  useEffect(() => {
    populateWithExistingData();
    setSeriesNames(getSeriesNames());
  }, []);

  return (
    <>
      <p className={styles.title}>Default Series</p>
      <Autocomplete
        multiple  // Allow multiple selections
        id="default-series-selector"
        sx={{
          maxWidth: "300px",
          width: 400,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
            backgroundColor: "white",
          },
        }}
        value={defaultSeries}
        onChange={(event, newValue) => {
          setDefaultSeries(newValue);  // Update selected series
        }}
        options={seriesNames}
        getOptionLabel={(option) => option.content}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Default Series"
            variant="outlined"
            size="small"
          />
        )}
      />
    </>
  );
}

export default DefaultSeries;
