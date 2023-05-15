import React, { useState, useEffect } from "react";
import CustomToggle from "@/components/CustomToggle/CustomToggle";
import styles from "./DefaultCollapsedState.module.css";

function DefaultCollapsedState(props) {
  const existingData = props.existingData.preferences;

  const setDataToSave = props.setDataToSave;
  const [collapsedIsDefault, setCollapsedIsDefault] = useState(false);
  const changeHasBeenMade = props.changeHasBeenMade;
  const setChangeHasBeenMade = props.setChangeHasBeenMade;




  useEffect(() => {
    console.log("existingData", existingData);
    if (existingData && existingData.defaultCollapsedState !== undefined) {
      setCollapsedIsDefault(existingData.defaultCollapsedState == 1 ? true : false);
    }
  }, [existingData]);




  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
        <p className={styles.title}>Collapse Series</p>


        </div>
        <div className={styles.right}>
        <CustomToggle
          checked={collapsedIsDefault}
          onChange={() => {
            if (!changeHasBeenMade) {
              setChangeHasBeenMade(true);
            }
            setCollapsedIsDefault(
              (prevCollapsedIsDefault) => !prevCollapsedIsDefault
            );
            setDataToSave((prevState) => ({
              ...prevState,
              preferences: {
                ...prevState.preferences,
                defaultCollapsedState: collapsedIsDefault ? 0 : 1,
              },
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
