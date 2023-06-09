import Body from "@/components/_common/Body/Body";
import Menu from "@/components/_common/Menu/Menu";
import { useState, useEffect } from "react";
import styles from "./settings.module.css";
import { CircularProgress } from "@mui/material";
import { checkLogin } from "@/common/util/auth";
// Components for PREFERENCES
import SeriesPrioritySelector from "@/components/settings/preferences/SeriesPrioritySelector/SeriesPrioritySelector";
import DefaultSeriesOrder from "@/components/settings/preferences/DefaultSeriesOrder/DefaultSeriesOrder";
import DefaultCollapsedState from "@/components/settings/preferences/DefaultCollapsedState/DefaultCollapsedState";
import DefaultSoldOutSeriesView from "@/components/settings/preferences/DefaultSoldOutSeriesView/DefaultSoldOutSeriesView";
// import DefaultSeries from "@/components/Settings/preferences/DefaultSeries/DefaultSeries";
// Components for MANAGE USERS
import AccessRequests from "@/components/settings/users/AccessRequests/AccessRequests";
import CreateUser from "@/components/settings/users/CreateUser/CreateUser";
import toast, { Toaster } from "react-hot-toast";


// Components for MY ACCOUNT
import UserDetails from "@/components/settings/MyAccount/UserDetails/UserDetails";
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
        preferences.defaultCollapsedState =
          existingData.preferences.series_start_collapsed;
        preferences.showSoldOut =
          existingData.preferences.sold_out_start_hidden;
        preferences.defaultSeriesSortOrder =
          existingData.preferences.default_series_order;
        preferences.seriesPriority = existingData.preferences.series_priority;
        preferences.defaultSeries = existingData.preferences.defaultSeries;

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

  const hasExistingData = Object.keys(existingData).length !== 0;

  return (
    <Body center direction="column" Tabs={true} activeTab="settings" h-80>
      <div className={styles.container}>
        <div className={styles.left}>
          <Menu
          title="Settings"
            menuItems={menuItems}
            activeMenuItem={activeMenuItem}
            setActiveMenuItem={setActiveMenuItem}
            showUserFunctions={true}
          />
        </div>
        <div className={styles.content}>
          {activeMenuItem === "preferences" && (
            <>
              <h1 className={styles.title + " " + styles["no-margin"]}>
                Series Display Settings
              </h1>

              {hasExistingData && (
                <SeriesPrioritySelector
                  setDataToSave={setDataToSave}
                  existingData={existingData}
                  changeHasBeenMade={changeHasBeenMade}
                  setChangeHasBeenMade={setChangeHasBeenMade}
                />
              )}
              {/* {hasExistingData && (
                <span className={styles["content-separator"]}></span>
              )}

              {hasExistingData && (
                <DefaultSeries
                  setDataToSave={setDataToSave}
                  existingData={existingData}
                  changeHasBeenMade={changeHasBeenMade}
                  setChangeHasBeenMade={setChangeHasBeenMade}
                />
              )} */}

              {hasExistingData && (
                <span className={styles["content-separator"]}></span>
              )}

              {hasExistingData && (
                <DefaultSeriesOrder
                  setDataToSave={setDataToSave}
                  existingData={existingData}
                  changeHasBeenMade={changeHasBeenMade}
                  setChangeHasBeenMade={setChangeHasBeenMade}
                />
              )}

              {hasExistingData && (
                <span className={styles["content-separator"]}></span>
              )}

              {hasExistingData && (
                <DefaultSoldOutSeriesView
                  setDataToSave={setDataToSave}
                  existingData={existingData}
                  changeHasBeenMade={changeHasBeenMade}
                  setChangeHasBeenMade={setChangeHasBeenMade}
                />
              )}

              {hasExistingData && (
                <span className={styles["content-separator"]}></span>
              )}

              <DefaultCollapsedState
                setDataToSave={setDataToSave}
                existingData={existingData}
                changeHasBeenMade={changeHasBeenMade}
                setChangeHasBeenMade={setChangeHasBeenMade}
              />
            </>
          )}

          {activeMenuItem === "manage users" && (
            <>
              <h1 className={styles.title + " " + styles["no-margin"]}>
                User Accounts and Permissions
              </h1>
            <CreateUser
            alertError={alertError}
            alertSuccess={alertSuccess}/>
            {hasExistingData && (
                <span className={styles["content-separator"]}></span>
              )}
              <AccessRequests
                alertError={alertError}
                alertSuccess={alertSuccess}
              />
            </>
          )}

          {activeMenuItem === "my account" && <><h1>Account Details</h1><UserDetails
            alertError={alertError}
            alertSuccess={alertSuccess}
            existingData={existingData}
            setExistingData={setExistingData} /></>
          }
          
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
