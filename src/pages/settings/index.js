import Body from "@/components/Body/Body";
import Menu from "@/components/Settings/Menu/Menu";
import { useState, useEffect } from "react";
import styles from "./settings.module.css";
import { CircularProgress } from "@mui/material";
import { checkLogin } from "@/common/util/auth";
import SeriesPrioritySelector from "@/components/SeriesPrioritySelector/SeriesPrioritySelector";
function Settings() {
  const [activeMenuItem, setActiveMenuItem] = useState("preferences");
  const menuItems = ["preferences", "manage users", "my account"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <h1 className={styles.title}>SETTINGS</h1>
          <span className={styles.divider}></span>
          <Menu
            menuItems={menuItems}
            activeMenuItem={activeMenuItem}
            setActiveMenuItem={setActiveMenuItem}
          />
        </div>
        <div className={styles.content}>
          {activeMenuItem === "preferences" ? (
            <><h1 className={styles.title}>Series Display Order</h1>
            <p>Assign priority placement for <b>Series</b> tab listings</p>
            <SeriesPrioritySelector/></>
          ) : activeMenuItem === "manage users" ? (
            <h1>User Stuff</h1>
          ) : activeMenuItem === "my account" ? (
            <h1>Account</h1>
          ) : null}
        </div>
      </div>
    </Body>
  );
}

export default Settings;
