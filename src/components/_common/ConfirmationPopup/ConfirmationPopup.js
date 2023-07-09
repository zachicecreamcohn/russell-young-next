import React, { useState } from "react";
import styles from "./ConfirmationPopup.module.css";
import SmallPopup from "@/components/popups/SmallPopup/SmallPopup";
import Button from '@mui/material/Button';


export default function ConfirmationPopup({ title="Are you sure?", message="This cannot be undone", onConfirm, onCancel=null, open, setOpen }) {



  function handleCancel() {
    setOpen(false);
    if (onCancel) onCancel();
  }

  function handleConfirm() {
    setOpen(false);
    if (onConfirm) onConfirm();
  }
  return (
    <>
    
      {open && (
        <div className={styles.container}>
        <SmallPopup title={title} subtitle={message} closePopup={() => setOpen(false)}>
          <div className={styles.container}>
            <div className={styles.buttons}>
                <button className={"theme-design error"} onClick={handleCancel}>
                    Cancel
                </button>
                <button className={"theme-design"} onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </SmallPopup>
        </div>
      )}
    </>
  );
}
