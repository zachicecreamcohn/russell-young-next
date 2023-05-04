import React, { useState, useEffect } from "react";
import Image from "../../../../russell-young/src/common/util/Cloudflare/Image";
import { Upload as UploadIcon } from "tabler-icons-react";
import { useRef } from "react";
import styles from "./HoverImageUpload.module.css";
import Upload from "../../../../russell-young/src/common/util/Cloudflare/Upload";
import DropFileInput from "../DropFileInput/DropFileInput";
import { CircularProgress } from "@mui/material";

function HoverImageUpload(props) {
  const [file, setFile] = useState([]);

  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);

  const imageID = props.imageID;
  const setImageID = props.setImageID;

  const handleFileUpload = async (files) => {
    // get the file from the input
    const file = files[0];

    setUploading(true);

    // create a new upload object
    const uploadObj = new Upload(file, props.childID);

    // upload the file to cloudflare
    const uploadSuccess = await uploadObj.upload();
    if (uploadSuccess) {
      console.log("upload success");
      // set the image URL in the parent component
      let imageObj = new Image(uploadObj.imageID);
      let imageURL = imageObj.getStandardSized();
      // refresh the page
      window.location.reload();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFileUpload(files);
  };

  return (
    <>
      <div
        className={styles["hover-upload-overlay"]}
        onClick={() => setUploadPopupOpen(true)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={styles["upload-icon"]}>
          <UploadIcon size={36} strokeWidth={2} color="white" />
        </div>
      </div>
      {uploadPopupOpen && (
        <div
          className={styles["upload-popup-container"]}
          onClick={(event) => {
            // check if the click was on the popup itself
            // if it was, don't close the popup

            // check if the clicked div has a parent or is the popup itself
            if (event.target.closest(`.${styles["upload-popup-container"]}`)) {
              // if it is, don't close the popup
              return;
            }
            // otherwise, close the popup
            setUploadPopupOpen(false);
          }}
        >
          <div className={styles["upload-popup"]}>
            {/* when uploading, show a spinner. otherwise, show the popup */}
            {uploading ? (
              <div className={styles["loading"]}>
                <CircularProgress
                  sx={{
                    color: "#000000",
                  }}
                />
                <p className="mt-3">Uploading...</p>
              </div>
            ) : (
              <>
                <h2>Upload an Image</h2>
                <DropFileInput file={file} setFile={setFile} />
                <button
                  className="theme-design w-100 mt-3"
                  onClick={() => {
                    handleFileUpload(file);
                  }}
                  disabled={file.length === 0}
                >
                  Upload
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default HoverImageUpload;
