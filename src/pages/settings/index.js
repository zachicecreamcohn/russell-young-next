import Body from "@/components/Body/Body";
import Menu from "@/components/Settings/Menu/Menu";
import { useState, useEffect } from "react";
import styles from "./settings.module.css";
import { CircularProgress } from "@mui/material";
import { checkLogin } from "@/common/util/auth";
import SeriesPrioritySelector from "@/components/Settings/SeriesPrioritySelector/SeriesPrioritySelector";
import DefaultSeriesOrder from "@/components/Settings/DefaultSeriesOrder/DefaultSeriesOrder";
import DefaultCollapsedState from "@/components/Settings/DefaultCollapsedState/DefaultCollapsedState";
import DefaultSoldOutSeriesView from "@/components/Settings/DefaultSoldOutSeriesView/DefaultSoldOutSeriesView";

function Settings() {
  const [activeMenuItem, setActiveMenuItem] = useState("preferences");
  const menuItems = ["preferences", "manage users", "my account"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataToSave, setDataToSave] = useState({});
  const [existingData, setExistingData] = useState({});

  useEffect(() => {
    checkLogin()
      .then((loggedIn) => {
        if (!loggedIn && window.location.pathname !== "/login") {
          window.location.href = "/login";
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function getExistingData() {
    fetch("/api/settings/preferences/getPreferences", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let existingData = data.preferences;
        let newData = {};
        newData.DefaultCollapsedState = existingData.series_start_collapsed;
        newData.showSoldOut = existingData.sold_out_start_hidden;
        newData.defaultSeriesSortOrder = existingData.default_series_order;
        newData.seriesPriority = existingData.series_priority;
        setExistingData(newData);
        console.log("existingData", existingData);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  // fetch existing data
  useEffect(() => {
    getExistingData();
    
  }, []);

  function deepEqual(a, b) {
    // This is necessary because comparing two arrays does so by reference, not by value
    if (a === b) {
      return true;
    }
  
    if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
      return false;
    }
  
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
  
    if (keysA.length !== keysB.length) {
      return false;
    }
  
    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }
  
    return true;
  }
  
  function dataHasChanged() {
    // check if the data to save is different from the existing data
    for (let key in dataToSave) {
      if (dataToSave[key] !== existingData[key] && !deepEqual(dataToSave[key], existingData[key])) {
        return true;
      
      }
    }
    return false;
  }




  useEffect(() => {

    // check if the data to save is different from the existing data
    if (dataHasChanged()) {
      console.log("data has changed");

      // identify what has changed
      for (let key in dataToSave) {
        if (dataToSave[key] !== existingData[key]) {
          console.log(key, "has changed");
          console.log("existingData", existingData[key]);
          console.log("dataToSave", dataToSave[key]);
        }
      }
    }
    
  }, [dataToSave]);

  if (!isLoggedIn) {
    return (
      <Body center>
        <CircularProgress
          sx={{
            color: "#000000",
          }}
        />
      </Body>
    );
  }
  return (
    <Body center direction="column" Tabs={true} activeTab="settings" h-80>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title + " " + styles["no-margin"]}>SETTINGS</h1>
          <span className={styles.divider}></span>
          <Menu
            menuItems={menuItems}
            activeMenuItem={activeMenuItem}
            setActiveMenuItem={setActiveMenuItem}
          />
        </div>
        <div className={styles.content}>
          {activeMenuItem === "preferences" ? (
            <>
              <>
                <h1 className={styles.title + " " + styles["no-margin"]}>
                  Series Display Settings
                </h1>
                {Object.keys(existingData).length !== 0 && (

                <><SeriesPrioritySelector setDataToSave={setDataToSave} existingData={existingData} /><span className={styles["content-separator"]}></span></>
                )}

              </>
              {Object.keys(existingData).length !== 0 && (<>
              <DefaultSeriesOrder setDataToSave={setDataToSave} existingData={existingData}/>
              <span className={styles["content-separator"]}></span>
              </>)}

              <DefaultCollapsedState setDataToSave={setDataToSave} existingData={existingData}/>
              {Object.keys(existingData).length !== 0 && (<>
              <span className={styles["content-separator"]}></span>
              </>)}

                {Object.keys(existingData).length !== 0 && (
              <DefaultSoldOutSeriesView setDataToSave={setDataToSave} existingData={existingData}/>
                )}
            </>
          ) : activeMenuItem === "manage users" ? (
            <h1>User Stuff</h1>
          ) : activeMenuItem === "my account" ? (
            <h1>Account</h1>
          ) : null}
          <div className={styles["save-button-container"]}>
            <button
              className={styles["save-button"] + " theme-design"}
              disabled={Object.keys(dataToSave).length === 0}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </Body>
  );
}

export default Settings;
