import React from "react";
import styles from "./Parent.module.css";
import Child from "../Child/Child";
import { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import DeleteIcon from "@/components/_common/DeleteIcon/DeleteIcon";
import AddIcon from "@/components/_common/AddIcon/AddIcon";
import ConfirmationPopup from "@/components/_common/ConfirmationPopup/ConfirmationPopup";
import toast, { Toaster } from "react-hot-toast";

function Parent(props) {
  const [deleteConfirmationPopupOpen, setDeleteConfirmationPopupOpen] =
    useState(false);

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

  function deleteParent() {
    console.log("Deleting parent");
    setDeleteConfirmationPopupOpen(true);

    fetch("/api/parents/deleteParent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        parentID: parentWork.parentID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alertSuccess("Deleted " + parentWork.title);
        }

        // delete the parent from localstorage

        // TODO: write code to delete the parent from localstorage instead of reloading the page
        localStorage.clear();
        window.location.reload();
      });
  }

  const parentWork = props.parentWork;
  const seriesID = props.seriesID;
  const [marginTop, setMarginTop] = useState("");

  // on render, get the height (offsetHeight) of element with class parent-header

  const parentSpecificClass = "parent-header-" + parentWork.parentID;
  useEffect(() => {
    const parentHeader =
      document.getElementsByClassName(parentSpecificClass)[0];
    const parentHeaderHeight = parentHeader.offsetHeight;
    const marginTopString = "calc(-" + parentHeaderHeight + "px - 1rem)";
    setMarginTop(marginTopString);
  }, []);

  return (
    <>


      <Toaster containerStyle={{ top: "50px" }} />

      {deleteConfirmationPopupOpen && (
        <ConfirmationPopup
          open={deleteConfirmationPopupOpen}
          setOpen={setDeleteConfirmationPopupOpen}
          onConfirm={() => {
            deleteParent();
            setDeleteConfirmationPopupOpen(false);
          }}
          title="Are you sure you want to delete this parent work?"
          subtitle="This action cannot be undone and will delete all child associated works."
        />
      )}

      <div className={styles.parent + " d-flex flex-row "}>
        <div className={styles["parent-content"]}>
          <div
            className={
              styles["parent-header"] +
              " d-flex flex-column justify-content-start " +
              parentSpecificClass
            }
          >
            <p className={styles["parent-detail"]}>
              {parentWork.title.toUpperCase()}
              <DeleteIcon
                onClick={() => {
                  setDeleteConfirmationPopupOpen(true);
                }}
              />

              <AddIcon marginLeft=".5rem" 
              
              
              />
            </p>
            <p className={styles["parent-detail"]}>{parentWork.year}</p>
            <div className={styles["parent-medium"]}>
              <p className={styles["parent-detail"]}>{parentWork.medium}</p>
            </div>
            <div className={styles["parent-size"]}>
              <p className={styles["parent-detail"]}>{parentWork.size}</p>
            </div>
          </div>

          <div
            className={styles["parent-children"]}
            style={{ marginTop: marginTop }}
          >
            {parentWork.children &&
              parentWork.children.length > 0 &&
              parentWork.children.map((child) => (
                <LazyLoad key={child.childID} style={{ width: "100%" }}>
                  <Child
                    childWork={child}
                    seriesID={seriesID}
                    key={child.childID}
                    hideSoldOut={props.hideSoldOut}
                  />
                </LazyLoad>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Parent;
