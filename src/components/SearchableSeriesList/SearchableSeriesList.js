import React from "react";
import { useState, useEffect } from "react";
// import styles
import styles from "./SearchableSeriesList.module.css";

import { CircularProgress } from "@mui/material";
import Series from "../SeriesListing/Series/Series";

function SearchableSeriesList(props) {
  return (
    <div className={styles["series-list"]}>
      {/* Use a ternary operator to conditionally render the loading spinner */}
      {props.loading ? (
        <div className="w-100 pt-4 h-100 d-flex justify-content-center align-items-center">
          <CircularProgress style={{ color: "black" }} />
        </div>
      ) : (
        <>
          {/* Wrap the collapse-all-toggle div and the seriesInfo.map inside a fragment */}
          <div className={styles["collapse-all-toggle-container"]+" d-flex justify-content-end"}>
            <div className={styles["collapse-all-toggle"]}>
              {props.allCollapsed ? (
                <p onClick={props.toggleCollapseAll}>Expand All</p>
              ) : (
                <p onClick={props.toggleCollapseAll}>Collapse All</p>
              )}
            </div>
          </div>

          {props.seriesInfo == [] ? (
            <div className="w-100 d-flex justify-content-center">
              <p>No results found</p>
            </div>
          ) : (
            props.seriesInfo.map((series) => {
              // if the seriesInfo array is empty, render a message

              // Use a variable to store the Series component if it should be rendered
              let component = null;
              if (
                props.seriesList.includes(series.series) ||
                props.seriesList.length == 0
              ) {
                // ensure that there exists at least one parent with more than 0 children
                let nonEmptyParent = false;
                if (series.parentWorks.length > 0) {
                  for (let i = 0; i < series.parentWorks.length; i++) {
                    if (series.parentWorks[i].children.length > 0) {
                      nonEmptyParent = true;
                    }
                  }
                }

                if (nonEmptyParent == true) {
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
