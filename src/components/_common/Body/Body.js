import Navbar from "@/components/_common/Navbar/Navbar";
import styles from "./Body.module.css";
import Tabs from "../Tabs/Tabs";
import { useState, useEffect } from "react";
import { checkLogin } from "@/common/util/auth";

function Body(props) {
    console.log("Body props", props);

  const bodyClasses = [styles.body];

  if (props.center) {
    bodyClasses.push(styles.center);
  }
  if (props["h-80"]) {
    bodyClasses.push(styles["h-80"]);
  }

  if (props.direction === "row") {
    bodyClasses.push(styles["flex-row"]);
  } else if (props.direction === "col") {
    bodyClasses.push(styles["flex-col"]);
  }

  return (
        <>
          <Navbar />
          {props.Tabs ? <Tabs activeTab={props.activeTab} /> : null}

          <div className={bodyClasses.join(" ")}>{props.children}</div>
        
    </>
  );
}

export default Body;
