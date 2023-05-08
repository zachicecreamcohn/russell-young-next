import Body from "@/components/Body/Body";
import Menu from "@/components/Settings/Menu/Menu";
import { useState } from "react";
import styles from "./settings.module.css";
function Settings() {
  const [activeMenuItem, setActiveMenuItem] = useState("preferences");
  const menuItems = ["preferences", "manage users", "my account"];

  return (
    <Body center direction="column" Tabs={true} activeTab="settings" h-80 >
      <div className={styles.container}>

        <div className={styles.left + " w-100"}>
            <h1 className={styles.title}>SETTINGS</h1>
            <span className={styles.divider}></span>
          <Menu
            menuItems={menuItems}
            activeMenuItem={activeMenuItem}
            setActiveMenuItem={setActiveMenuItem}
          />
        </div>
        <div className="w-100"></div>
      </div>
    </Body>
  );
}

export default Settings;
