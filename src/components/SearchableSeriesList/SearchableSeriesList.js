import React, { useState, useEffect } from "react";
import styles from "./SearchableSeriesList.module.css";
import CustomToggle from "../CustomToggle/CustomToggle";
import { CircularProgress } from "@mui/material";
import Series from "../SeriesListing/Series/Series";

function SearchableSeriesList(props) {
  const [sortedSeriesInfo, setSortedSeriesInfo] = useState([]);
  const sortOrder = props.sortOrder;
  const setSortOrder = props.setSortOrder;

  useEffect(() => {
    // Sort the seriesInfo whenever it changes
    sortSeriesInfo();
  }, [props.seriesInfo]);

  useEffect(() => {
    // Sort the seriesInfo whenever the sortOrder changes
    sortSeriesInfo();
  }, [sortOrder]);


  const sortSeriesInfo = () => {
    console.log("Sorting series info");
    console.log(sortOrder);
    console.log(sortOrder == "Z → A");
    switch (sortOrder) {
      case "A → Z":
        sortAZ();
        break;
      case "Z → A":
        sortZA();
        break;
      default:
        console.log("Defaulting to A → Z");
        sortAZ();
        break;
    }
  };

  const sortAZ = () => {
    // Copy the seriesInfo array
    let sortedInfo = [...props.seriesInfo];
    sortedInfo.sort((a, b) => {
      // Here, sorting based on the series name in ascending order
      if (a.series < b.series) return -1;
      if (a.series > b.series) return 1;
      return 0;
    });

    setSortedSeriesInfo(sortedInfo);
  };

  const sortZA = () => {
    // Copy the seriesInfo array
    let sortedInfo = [...props.seriesInfo];
    sortedInfo.sort((a, b) => {
      // Here, sorting based on the series name in descending order
      if (a.series > b.series) return -1;
      if (a.series < b.series) return 1;
      return 0;
    });

    setSortedSeriesInfo(sortedInfo);

  };

  return (
    <div className={styles["series-list"]}>
      {props.loading ? (
        <div className="w-100 pt-4 h-100 d-flex justify-content-center align-items-center">
          <CircularProgress style={{ color: "black" }} />
        </div>
      ) : (
        <>
          <div className={styles["collapse-all-toggle-container"]}>
            <p>Collapse Series</p>
            <CustomToggle
              checked={props.allCollapsed}
              onChange={props.toggleCollapseAll}
              label="Collapse All"
            />
          </div>

          {sortedSeriesInfo.length === 0 ? (
            <div className="w-100 d-flex justify-content-center">
              <p>No results found</p>
            </div>
          ) : (
            sortedSeriesInfo.map((series) => {
              let component = null;
              if (
                props.seriesList.includes(series.series) ||
                props.seriesList.length === 0
              ) {
                let nonEmptyParent = false;
                if (series.parentWorks.length > 0) {
                  for (let i = 0; i < series.parentWorks.length; i++) {
                    if (series.parentWorks[i].children.length > 0) {
                      nonEmptyParent = true;
                      break;
                    }
                  }
                }

                if (nonEmptyParent) {
                  component = (
                    <Series
                      key={series.seriesID}
                      series={series.series}
                      seriesID={series.seriesID}
                      parentWorks={series.parentWorks}
                      allCollapsed={props.allCollapsed}
                      hideSoldOut={props.hideSoldOut}
                    />
                  );
                }
              }

              return component;
            })
          )}
        </>
      )}
    </div>
  );
}

export default SearchableSeriesList;
