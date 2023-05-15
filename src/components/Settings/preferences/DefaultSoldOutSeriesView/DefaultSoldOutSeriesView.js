import React, { useState, useEffect } from "react";
import CustomToggle from "@/components/CustomToggle/CustomToggle";
import styles from "./DefaultSoldOutSeriesView.module.css";

function DefaultSoldOutSeriesView(props) {
  const setDataToSave = props.setDataToSave;
  const [showSoldOut, setShowSoldOut] = useState(false);
  const existingData = props.existingData.preferences;
  const changeHasBeenMade = props.changeHasBeenMade;
  const setChangeHasBeenMade = props.setChangeHasBeenMade;

  useEffect(() => {
    console.log("existingData", existingData);
    if (existingData && existingData.showSoldOut !== undefined) {
      setShowSoldOut(existingData.showSoldOut == 1 ? true : false);
    }
  }, [existingData]);
    
    


  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
        <p className={styles.title}>Hide Sold Out</p>

        </div>
        <div className={styles.right}>
        <CustomToggle
          checked={showSoldOut}
          onChange={() => {
            if (!changeHasBeenMade) {
              setChangeHasBeenMade(true);
            }
            setShowSoldOut(
              (prevShowSoldOut) => !prevShowSoldOut
            );
            setDataToSave((prevState) => ({
              ...prevState,
              preferences: {
                ...prevState.preferences,
                showSoldOut: !showSoldOut ? 1 : 0,
              },              
            }));
          }}
          label="Show Sold Out'"
        />
      </div>
        </div>
    </>
  );
}

export default DefaultSoldOutSeriesView;
