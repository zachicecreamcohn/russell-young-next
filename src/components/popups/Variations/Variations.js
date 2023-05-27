import React from "react";
import Variation from "../Variation/Variation";
import styles from "./Variations.module.css";
import { Reload } from 'tabler-icons-react';
import { useState, useEffect } from "react";

function Variations(props) {
  const childID = props.childID;
  const [allCollapsed, setAllCollapsed] = useState(true);
  const [variations, setVariations] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [changedData, setChangedData] = useState({});
  const [originalData, setOriginalData] = useState({});

  const fetchData = async () => {
    // fetch(
    //   "https://api.russellyoung.zachcohndev.com/demo/variationdetails?childid=" +
    //     childID,
    //   {
    //     method: "GET",
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setVariations(data.data);
    //     setOriginalData(data.data);
    //   });

    fetch('/api/variations/getAllDetails',
    {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            childID: childID
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setVariations(data.data);
        setOriginalData(data.data);
    }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  function resetData() {
    // reset the data to the original state
    setVariations(originalData);
    setIsDataChanged(false);
  }

  function saveChanges() {
    // save the changes to the server
    // TODO: do this later
  }

  function toggleAllCollapsed() {
    setAllCollapsed(!allCollapsed);
  }

  return (
    <>
      {/* if changes are made, enable the button */}
      <div className={`${styles.changes} ${isDataChanged ? "" : styles.disabled}`}>
        {isDataChanged ? (
          <button className={`${styles["save-changes-button"]} theme-design`} onClick={saveChanges}>
            Save Changes
          </button>
        ) : (
          <button className={`${styles["save-changes-button"]} theme-design`} disabled>
            Save Changes
          </button>
        )}

        <Reload className={styles["reset-changes-button"]} onClick={resetData} />
      </div>

      <div className={styles.variations}>
        {Object.keys(variations).length > 0 ? (
          Object.keys(variations).map((variation) => (
            <Variation
              key={variation}
              Variation={variations[variation]}
              allCollapsed={allCollapsed}
              isDataChanged={isDataChanged}
              setIsDataChanged={setIsDataChanged}
              changedData={changedData}
              setChangedData={setChangedData}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}

        {/* 
        <div className="toggle-all" onClick={toggleAllCollapsed}>
          {allCollapsed ? "Expand All" : "Collapse All"}
        </div> 
        */}
      </div>
    </>
  );
}

export default Variations;
