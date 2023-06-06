import React from "react";
import styles from "./Parent.module.css";
import Child from "../Child/Child";
import { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";

function Parent(props) {
  const parentWork = props.parentWork;
  const seriesID = props.seriesID;
  const [marginTop, setMarginTop] = useState("");

  // on render, get the height (offsetHeight) of element with class parent-header

  const parentSpecificClass = "parent-header-" + parentWork.parentID;
  useEffect(() => {
    const parentHeader = document.getElementsByClassName(parentSpecificClass)[0];
    const parentHeaderHeight = parentHeader.offsetHeight;
    const marginTopString = "calc(-" + parentHeaderHeight + "px - 1rem)";
    setMarginTop(marginTopString);
  }, []);


  return (
    <>
      <div className={styles.parent + " d-flex flex-row "} >
        <div className={styles["parent-content"]}>
          <div className={styles["parent-header"] + " d-flex flex-column justify-content-start " + parentSpecificClass}>
            <p className={styles["parent-detail"]}>
              {parentWork.title.toUpperCase()}
            </p>
            <p className={styles["parent-detail"]}>{parentWork.year}</p>
            <div className={styles["parent-medium"]}>
              <p className={styles["parent-detail"]}>{parentWork.medium}</p>
            </div>
            <div className={styles["parent-size"]}>
              <p className={styles["parent-detail"]}>{parentWork.size}</p>
            </div>
          </div>

          <div className={styles["parent-children"]}
            style={{ marginTop: marginTop }}
          >
            {parentWork.children && parentWork.children.length > 0 && parentWork.children.map((child) => (
              <LazyLoad key={child.childID}style={{ width: "100%" }}>
                <Child childWork={child} seriesID={seriesID} key={child.childID} hideSoldOut={props.hideSoldOut}
                />
              </LazyLoad>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Parent;
