import React, { useState, useEffect } from "react";
import styles from "./Series.module.css";
import Parent from "../Parent/Parent";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
function Series(props) {





    const { series, seriesID, parentWorks, allCollapsed } = props;
  
    // define a state variable to hold the state (collapsed or expanded) of the series
    const [collapsed, setCollapsed] = useState(allCollapsed);
    
    const [startYear, setStartYear] = useState(props.startYear);
    const [endYear, setEndYear] = useState(props.endYear);

  
  
    // handle changes in props.endYear and props.startYear
    useEffect(() => {
        setStartYear(props.startYear);
        setEndYear(props.endYear);
    }, [props.startYear, props.endYear]);

    // a function to check if a year is within the range of startYear and endYear
    function checkYear(year) {
        if (year >= startYear && year <= endYear) {
            return true;
        } else {
            return false;
        }
    }




  
    // if the allCollapsed prop changes, update the state of the series
    useEffect(() => {

        setCollapsed(allCollapsed);
        console.log("All collapsed changed");
        console.log("All collapsed: " + allCollapsed);
        console.log("Collapsed: " + collapsed);

    }, [allCollapsed]);




    function toggleCollapsed() {
      setCollapsed((prevCollapsed) => !prevCollapsed);

      
    }
  
    return (
      <div className={styles.series}>
        <div className={styles["series-header"] +" d-flex justify-content-between"}>
          <div className={styles["series-name"]}>
            <h3>{series}</h3>
          </div>
          <div className={styles["collapse-icon"]}>
            {/* depending on the state of collapsed, show the appropriate icon */}
            {collapsed ? (
              // set the color to black
              <ChevronDown
                fill="black"
                size={25}
                stroke={1.5}
                onClick={() => toggleCollapsed()}
              />
            ) : (
              <ChevronUp
                fill="black"
                size={25}
                stroke={1.5}
                onClick={() => toggleCollapsed()}
              />
            )}
          </div>
        </div>
            
            
        <div
        // className={styles["series-body"] + " d-flex flex-column series-collapsable"}
        className={collapsed ? styles["series-body"] + " d-flex flex-column series-collapsable" : styles["series-body"] + " d-flex flex-column series-collapsable d-none"}

        id={`series-body-${seriesID}`}>
          {/* for each work in the parentWorks array, render a Parent component */}
          {parentWorks.map((parentWork) => {

            // only show the parent if it has children
            if (parentWork.children.length > 0) {
            // check if the work's year is within the range of startYear and endYear
            // if (checkYear(parentWork.year)) {

                return (
                
                <Parent key={parentWork.parentID} parentWork={parentWork} seriesID={seriesID} hideSoldOut={props.hideSoldOut}/>
                );
            }
          })}
        </div>
      </div>
    );
  }

    export default Series;