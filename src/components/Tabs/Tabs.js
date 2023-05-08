import React from "react";
import styles from "./Tabs.module.css";
import { UserCircle } from "tabler-icons-react";


function navigate(tab) {
  window.location.href = "/" + tab;
}

function Tabs(props) {
  return (
    <div className={styles.container}>
      <div
      className={props.activeTab === "series" ? styles.tab+ " " + styles.active : styles.tab}
        onClick={() => navigate("series")}
      
      >Series</div>
        <div 
        className={props.activeTab === "consignment" ? styles.tab+ " " + styles.active : styles.tab}
        onClick={() => navigate("consignment")}

        >Consignment</div>

        <div
        className={props.activeTab === "settings" ? styles.tab+ " " + styles.active : styles.tab}
        onClick={() => navigate("settings")}
        >

          <UserCircle size={24} strokeWidth={1.5}/>

        {/* <p></p> */}
        </div>
    </div>
  );
}

export default Tabs;