import React from "react";
import styles from "./Parent.module.css";
import Child from "../Child/Child";
import { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";

function Parent(props) {
  const parentWork = props.parentWork;
  const seriesID = props.seriesID;

  return (
    <>
      <div className={styles.parent + " d-flex flex-row "}>
        <div className={styles["parent-content"]}>
          <div className={styles["parent-header"] + " d-flex flex-column justify-content-start"}>
            <p className={styles["parent-detail"]}>
              {parentWork.title}
            </p>
            <p className={styles["parent-detail"]}>{parentWork.year}</p>
            <div className={styles["parent-medium"]}>
              <p className={styles["parent-detail"]}>{parentWork.medium}</p>
            </div>
            <div className={styles["parent-size"]}>
              <p className={styles["parent-detail"]}>{parentWork.size}</p>
            </div>
          </div>

          <div className={styles["parent-children"]}>
            {parentWork.children && parentWork.children.length > 0 && parentWork.children.map((child) => (
              <LazyLoad style={{ width: "100%" }}>
                <Child childWork={child} seriesID={seriesID} key={child.childID} hideSoldOut={props.hideSoldOut} />
              </LazyLoad>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Parent;
