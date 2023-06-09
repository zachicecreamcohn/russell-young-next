import React from "react";
import FullScreenPopup from "../FullScreenPopup/FullScreenPopup";
import styles from "./ChildWorkPopup.module.css";
import { AgGridReact } from "ag-grid-react";
import Variations from "../Variations/Variations";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useEffect } from "react";
import Image from "@/common/util/Cloudflare/Image";
import HoverImageUpload from "../../uploads/HoverImageUpload/HoverImageUpload";
import { CircularProgress } from "@mui/material";
import EditableInput from "@/components/_common/EditableInput/EditableInput";
import toast, { Toaster } from "react-hot-toast";
// import {Image as Img} from "next/image";



function ChildWorkPopup(props) {






  // modify the URL to add the child ID
  // This will be used in case the user refreshes the page
  let thisURL = window.location.href;
  // if it already has a child ID, remove it and replace it with the new one
  if (thisURL.includes("?childID=")) {
    thisURL = thisURL.split("?childID=")[0];
  }
  let newURL = thisURL + "?childID=" + props.id;
  window.history.pushState({ path: newURL }, "", newURL);

  let id = props.id;

  // define a state far for when things have fully loaded at the start
  const [loaded, setLoaded] = useState(false);

  // define a state var to hold the data for the child work
  const [childWorkData, setChildWorkData] = useState({});
  const [imageURL, setImageURL] = useState("");
  const [imageID, setImageID] = useState("");

  useEffect(() => {
    console.log("image ID has changed");
    console.log(imageID);
  }, [imageID]);

  // get the data for the child work from the server
  useEffect(() => {
   


    fetch('/api/childDetails/getSpecificChild',
    {
        
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          childID: id,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        data = data.data;
        setChildWorkData(data);
        setLoaded(true);
        console.log(data);
        const imageObj = new Image(data.summary.imageID);
        const imageURL = imageObj.getStandardSized();
        // set the image url
        setImageURL(imageURL);
      } else {
        throw new Error(data.message);
      }
    }
    );
          
  }, []);





  function saveChanges(field, value) {
    //TODO: fill this out
    console.log("saving changes");
    console.log(field, value);

    fetch ('/api/childDetails/editDetail', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        childID: id,
        field: field,
        value: value,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        toast.success("Changes saved", {
          style: {
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.01)",
          },
          position: "top-center",
        });
      } else {
        toast.error("Error saving changes", {
          style: {
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.01)",
          },
          position: "top-center",
        });

      throw new Error(data.message);
      }


    }
    );
  }

  return (
    <FullScreenPopup
      popupContent={
        // if not loaded, show loader
        !loaded ? (
          <div className={styles["loading"]}>
          <CircularProgress
            sx={{
              color: "#000000",
            }}
          />
          <p className="mt-3">Populating...</p>
        </div>
        ) : (
          <div className={styles["child-work-popup"]}>
            <div className={styles.left}>
              <div className={styles["child-img"]}>
                <img src={imageURL} alt="child work" />
                <HoverImageUpload
                  childID={id}
                  setImageURL={setImageURL}
                  imageID={imageID}
                  setImageID={setImageID}
                />
                {/* <div className="overlay"></div> */}
              </div>
              <div className={styles.summary}>
                <table>
                  <tbody>
                    <tr>
                      <td className={styles["field-name"]}>Series</td>
                      <td>
                      <EditableInput
                      value={childWorkData.summary.series}
                      save={(value) => saveChanges("series", value)}
                      />
                      </td>

                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Title</td>
                      <td>
                        <EditableInput
                        value={childWorkData.summary.title}
                        save={(value) => saveChanges("title", value)}

                        /></td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Subtitle</td>
                      <td>
                        <EditableInput
                        value={childWorkData.summary.subtitle}
                        save={(value) => saveChanges("subTitle", value)}
                        /></td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Color</td>
                      <td>
                        <EditableInput
                        value={childWorkData.summary.color}
                        save={(value) => saveChanges("color", value)}
                        /></td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Year</td>
                      <td>
                        <EditableInput
                        value={childWorkData.summary.year}
                        save={(value) => saveChanges("year", value)}
                        type="number"
                        /></td>
                        
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Medium</td>
                      <td>
                        <EditableInput
                        value={childWorkData.summary.medium}
                        save={(value) => saveChanges("medium", value)}
                        multiline={true}
                        /></td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Size</td>
                      <td>
                        <EditableInput
                        value={childWorkData.summary.size}
                        save={(value) => saveChanges("size", value)}
                        />
                        </td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Type</td>
                      <td>
                        <EditableInput
                        value={childWorkData.summary.type}
                        save={(value) => saveChanges("type", value)}
                        /></td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Notes</td>
                      <td>
                        <EditableInput
                        value={childWorkData.summary.notes}
                        save={(value) => saveChanges("notes", value)}
                        multiline={true}
                        rows={4}

                        /></td>

                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.summary}>
                <Variations childID={id} />
              </div>
            </div>
          </div>
        )
      }
      closePopup={props.closePopup}
    />
  );
  <Toaster containerStyle={{ top: "50px" }} />

}

export default ChildWorkPopup;
