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
import toast, { Toaster } from "react-hot-toast";
function Settings() {
  const [activeMenuItem, setActiveMenuItem] = useState("preferences");
  const menuItems = ["preferences", "manage users", "my account"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataToSave, setDataToSave] = useState({});
  const [existingData, setExistingData] = useState({});
  const [changeHasBeenMade, setChangeHasBeenMade] = useState(false);
  const [saveable, setSaveable] = useState(false);

  function alertError(message) {
    toast.error(message, {
      style: {
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
      },
      position: "top-center",
    });
  }

  function alertSuccess(message) {
    toast.success(message, {
      style: {
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
      },
      position: "top-center",
    });
  }

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

  function saveChanges() {
    console.log(dataToSave);
    // send the data to save to the server
    fetch("/api/settings/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alertSuccess("Changes saved.");
          // set the existing data to the data to save
          setExistingData(dataToSave);
          setChangeHasBeenMade(false);
          setSaveable(false);
        } else {
          alertError("Error saving changes.");
        }
      })
      .catch((error) => {
        alertError("Error saving changes. Check console for details.");
        console.error(error);
      });

  }


  async function getExistingData() {
    return fetch("/api/settings/preferences/getPreferences", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let existingData = data;
        let newData = {};

        let preferences = {};
        preferences.defaultCollapsedState = existingData.preferences.series_start_collapsed;
        preferences.showSoldOut = existingData.preferences.sold_out_start_hidden;
        preferences.defaultSeriesSortOrder = existingData.preferences.default_series_order;
        preferences.seriesPriority = existingData.preferences.series_priority;
        
        newData.preferences = preferences;

        setExistingData(newData);
        // set the data to save to the existing data
        setDataToSave(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // fetch existing data
  useEffect(() => {
    getExistingData();
  }, []);

  useEffect(() => {
    let changed = dataHasChanged();
    if (changed) {
      console.log("data has changed");
      console.log("dataToSave", dataToSave);
      console.log("existingData", existingData);
    }

    setSaveable(changed);
  }, [dataToSave]);

  function deepEqual(a, b) {
    // This is necessary because comparing two arrays does so by reference, not by value
    if (a === b) {
      return true;
    }

    if (
      typeof a !== "object" ||
      typeof b !== "object" ||
      a === null ||
      b === null
    ) {
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
    // make sure the existing data is not empty
    if (
      Object.keys(existingData).length === 0 ||
      Object.keys(dataToSave).length === 0
    ) {
      return false;
    }

    if (!changeHasBeenMade) {
      return false;
    }

    for (let key in dataToSave) {
      if (
        dataToSave[key] !== existingData[key] &&
        !deepEqual(dataToSave[key], existingData[key])
      ) {
        return true;
      }
    }
    return false;
  }

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
                  <>
                    <SeriesPrioritySelector
                      setDataToSave={setDataToSave}
                      existingData={existingData}
                      changeHasBeenMade={changeHasBeenMade}
                      setChangeHasBeenMade={setChangeHasBeenMade}
                    />
                    <span className={styles["content-separator"]}></span>
                  </>
                )}
              </>
              {Object.keys(existingData).length !== 0 && (
                <>
                  <DefaultSeriesOrder
                    setDataToSave={setDataToSave}
                    existingData={existingData}
                    changeHasBeenMade={changeHasBeenMade}
                    setChangeHasBeenMade={setChangeHasBeenMade}
                  />
                  <span className={styles["content-separator"]}></span>
                </>
              )}

              <DefaultCollapsedState
                setDataToSave={setDataToSave}
                existingData={existingData}
                changeHasBeenMade={changeHasBeenMade}
                setChangeHasBeenMade={setChangeHasBeenMade}
              />
              {Object.keys(existingData).length !== 0 && (
                <>
                  <span className={styles["content-separator"]}></span>
                </>
              )}

              {Object.keys(existingData).length !== 0 && (
                <DefaultSoldOutSeriesView
                  setDataToSave={setDataToSave}
                  existingData={existingData}
                  changeHasBeenMade={changeHasBeenMade}
                  setChangeHasBeenMade={setChangeHasBeenMade}
                />
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
              disabled={!saveable}
              onClick={saveChanges}
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
      <Toaster containerStyle={{ top: "50px" }} />
    </Body>
  );
}

export default Settings;
