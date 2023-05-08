import React from "react";
import styles from "./Tabs.module.css";
import { Settings } from "tabler-icons-react";


function navigate(tab) {
  window.location.href = "/" + tab;
}

function Tabs(props) {
  return (
    <div className={styles.container}>
      <div
      className={props.activeTab === "series" ? styles.tab+ " " + styles.active : styles.tab}
        onClick={() => navigate("series")}
      
      >SERIES</div>
        <div 
        className={props.activeTab === "consignment" ? styles.tab+ " " + styles.active : styles.tab}
        onClick={() => navigate("consignment")}

        >CONSIGNMENT</div>

        <div
        className={props.activeTab === "settings" ? styles.tab+ " " + styles.active : styles.tab}
        onClick={() => navigate("settings")}
        ><Settings
        size={22}
        
        />
        </div>
    </div>
  );
}

export default Tabs;