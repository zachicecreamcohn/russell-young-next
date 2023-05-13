import React, { useState, useEffect } from "react";
import CustomToggle from "@/components/CustomToggle/CustomToggle";
import styles from "./DefaultCollapsedState.module.css";

function DefaultCollapsedState(props) {
  const existingData = props.existingData;

  const setDataToSave = props.setDataToSave;
  console.log(existingData.DefaultCollapsedState);
  const [collapsedIsDefault, setCollapsedIsDefault] = useState(false);



  useEffect(() => {
    if (existingData && existingData.DefaultCollapsedState !== undefined) {
      setCollapsedIsDefault(existingData.DefaultCollapsedState == 1 ? true : false);
    }
  }, [existingData]);




  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
        <p className={styles.title}>Series' Start Collapsed</p>

        </div>
        <div className={styles.right}>
        <CustomToggle
          checked={collapsedIsDefault}
          onChange={() => {
            setCollapsedIsDefault(
              (prevCollapsedIsDefault) => !prevCollapsedIsDefault
            );
            setDataToSave((prevState) => ({
              ...prevState,
              defaultCollapsedState: !collapsedIsDefault,
            }));
          }}
          label="Series Collapsed On Page Load"
        />
      </div>
        </div>
    </>
  );
}

export default DefaultCollapsedState;
