import React, { useState, useEffect } from "react";
import styles from "./Series.module.css";
import Parent from "../Parent/Parent";
import { ChevronDown, ChevronRight } from "tabler-icons-react";
import DeleteIcon from "@/components/_common/DeleteIcon/DeleteIcon";
import AddIcon from "@/components/_common/AddIcon/AddIcon";
import ConfirmationPopup from "@/components/_common/ConfirmationPopup/ConfirmationPopup";
import toast, { Toaster } from "react-hot-toast";
import AddParentPopup from "@/components/popups/AddParentPopup/AddParentPopup";

function Series(props) {
  const [addParentPopupOpen, setAddParentPopupOpen] = useState(false);

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
  const [deleteConfirmationPopupOpen, setDeleteConfirmationPopupOpen] =
    useState(false);

  function deleteSeries() {
    fetch("/api/series/deleteSeries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        seriesID: seriesID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alertSuccess("Deleted " + series);
        }

        // delete the series from localstorage
        // TODO: write code to delete the series from localstorage instead of reloading the page
        localStorage.clear();
        window.location.reload();
      });
  }

  const { series, seriesID, parentWorks, allCollapsed } = props;

  // define a state variable to hold the state (collapsed or expanded) of the series
  const [collapsed, setCollapsed] = useState(allCollapsed);

  const [startYear, setStartYear] = useState(props.startYear);
  const [endYear, setEndYear] = useState(props.endYear);

  // handle changes in props.endYear and props.startYear
  useEffect(() => {
    setStartYear(props.startYear);
    setEndYear(props.endYear);
  }, [props.startYear, props.endYear]);

  // a function to check if a year is within the range of startYear and endYear
  function checkYear(year) {
    if (year >= startYear && year <= endYear) {
      return true;
    } else {
      return false;
    }
  }

  // if the allCollapsed prop changes, update the state of the series
  useEffect(() => {
    setCollapsed(allCollapsed);
  }, [allCollapsed]);

  function toggleCollapsed() {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  }
  return (
    <>
      {addParentPopupOpen && (
        <AddParentPopup
          closePopup={() => setAddParentPopupOpen(false)}
          seriesID={seriesID}
        />
      )}

      <Toaster containerStyle={{ top: "50px" }} />

      {deleteConfirmationPopupOpen && (
        <ConfirmationPopup
          open={deleteConfirmationPopupOpen}
          setOpen={setDeleteConfirmationPopupOpen}
          onConfirm={() => {
            deleteSeries();
            setDeleteConfirmationPopupOpen(false);
          }}
          title="Are you sure you want to delete this series?"
          subtitle="This action cannot be undone and will delete all associated works."
        />
      )}

      <div className={styles.series}>
        <div
          className={`${styles["series-header"]} d-flex justify-content-between`}
        >
          <div className={styles["series-name"]}>
            <h3>{series}</h3>
            <DeleteIcon onClick={() => setDeleteConfirmationPopupOpen(true)} />
            <AddIcon
              marginLeft=".5rem"
              onClick={() => {
                setAddParentPopupOpen(true);
              }}
            />
          </div>

          {props.empty && (
            <div className={styles["collapse-icon"]}>
              {/* depending on the state of collapsed, show the appropriate icon */}
              {collapsed ? (
                // set the color to black
                <ChevronRight
                  fill="black"
                  size={25}
                  stroke={1.5}
                  onClick={() => toggleCollapsed()}
                />
              ) : (
                <ChevronDown
                  fill="black"
                  size={25}
                  stroke={1.5}
                  onClick={() => toggleCollapsed()}
                />
              )}
            </div>
          )}
        </div>

        <div
          className={
            !collapsed
              ? `${styles["series-body"]} d-flex flex-column series-collapsable`
              : `${styles["series-body"]} d-flex flex-column series-collapsable d-none`
          }
          id={`series-body-${seriesID}`}
        >
          {props.empty ? (
            /* for each work in the parentWorks array, render a Parent component */
            parentWorks.map((parentWork) => {
              // check if the work's year is within the range of startYear and endYear
              // if (checkYear(parentWork.year)) {
              return (
                <Parent
                  key={parentWork.parentID}
                  parentWork={parentWork}
                  seriesID={seriesID}
                  hideSoldOut={props.hideSoldOut}
                />
              );
            })
          ) : (
            <p>This Series Is Empty</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Series;
