import React from "react";
import FullScreenPopup from "../FullScreenPopup/FullScreenPopup";
import styles from "./ChildWorkPopup.module.css";
import { AgGridReact } from "ag-grid-react";
import Variations from "../../Variations/Variations";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useEffect } from "react";
import Image from "@/common/util/Cloudflare/Image";
import HoverImageUpload from "../../HoverImageUpload/HoverImageUpload";

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
    fetch(
      "https://api.russellyoung.zachcohndev.com/demo/child-details?childid=" +
        id
    )
      .then((response) => response.json())
      .then((data) => {
        setChildWorkData(data);
        setLoaded(true);
        console.log(data);
        const imageObj = new Image(data.summary.imageID);
        const imageURL = imageObj.getStandardSized();
        // set the image url
        setImageURL(imageURL);
      });
  }, []);

  const placeholderImageObj = new Image();
  const placeholderURL = placeholderImageObj.getStandardSized();

  return (
    <FullScreenPopup
      popupContent={
        // if not loaded, show skeleton
        !loaded ? (
          <div className={styles["child-work-popup"]}>
            <div className={styles.left}>
              <div className={styles["child-img"]}>
                <img src={placeholderURL} alt="child work" />
              </div>
              <div className={styles.summary}>
                <table>
                  <tbody>
                    <tr>
                      <td className={styles["field-name"]}>Series</td>
                      <td className={styles.skeleton}>AAAAAAAAAAAAAAAAAAAAAAAAA</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Title</td>
                      <td className={styles.skeleton}>AAAAAAAAAAAAAAAAAAAAAAAAA</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Subtitle</td>
                      <td className={styles.skeleton}>AAAAAAAAAAAAAAAAAAAAAAAAA</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Color</td>
                      <td className={styles.skeleton}>AAAAAAAAAAAAAAAAAAAAAAAAA</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Year</td>
                      <td className={styles.skeleton}>AAAAAAAAAAAAAAAAAAAAAAAAA</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Medium</td>
                      <td className={styles.skeleton}>AAAAAAAAAAAAAAAAAAAAAAAAA</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Size</td>
                      <td className={styles.skeleton}>AAAAAAAAAAAAAAAAAAAAAAAAA</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Type</td>
                      <td className={styles.skeleton}>AAAAAAAAAAAAAAAAAAAAAAAAA</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Notes</td>
                      <td className={styles.skeleton}>AAAAAAAAAAAAAAAAAAAAAAAAA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.summary}>
                {/* <Variations
                skeleton={true}
              /> */}
              </div>
            </div>
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
                      <td>{childWorkData.summary.series}</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Title</td>
                      <td>{childWorkData.summary.title}</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Subtitle</td>
                      <td>{childWorkData.summary.subtitle}</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Color</td>
                      <td>{childWorkData.summary.color}</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Year</td>
                      <td>{childWorkData.summary.year}</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Medium</td>
                      <td>{childWorkData.summary.medium}</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Size</td>
                      <td>{childWorkData.summary.size}</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Type</td>
                      <td>{childWorkData.summary.type}</td>
                    </tr>
                    <tr>
                      <td className={styles["field-name"]}>Notes</td>
                      <td>{childWorkData.summary.notes}</td>
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
}

export default ChildWorkPopup;
