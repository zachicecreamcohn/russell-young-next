import React from "react";
import styles from "./Child.module.css";
import ChildWorkPopup from "../../popups/ChildWorkPopup/ChildWorkPopup";
import { useState, useEffect } from "react";
import { Share, Link } from "tabler-icons-react";
import toast, { Toaster } from "react-hot-toast";
import shareContent from "../../../../../russell-young/src/common/util/Share";
import CONFIG_VARS from "@/CONFIG_VARS";
import Image from "@/common/util/Cloudflare/Image";
function Child(props) {
  function shareWork() {
    shareContent({
      title: props.childWork.title,
      text: props.childWork.title,
      url: CONFIG_VARS.ROOT_URL + "/preview?id=" + props.childWork.childID,
    });
  }

  const notify = () => toast("Here is your toast.");

  const [ChildWorkPopupIsOpen, setChildWorkPopupIsOpen] = useState(
    props.popupOpen || false
  );
  const [visible, setVisible] = useState(props.childWork.visible);

  function closePopup() {
    setChildWorkPopupIsOpen(false);
    // the URL will have ?childID=X appended to it, so we need to remove that
    let newURL = window.location.href.split("?")[0];
    window.history.pushState({ path: newURL }, "", newURL);
  }

  const madeVisible = () => {
    setVisible(true);
    toast.success(props.childWork.title + " is now visible", {
      style: {
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.01)",
      },
      position: "top-center",
    });
  };

  const madeInvisible = () => {
    setVisible(false);
    toast.success(props.childWork.title + " is now invisible", {
      style: {
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.01)",
      },
      position: "top-center",
    });
  };

  let work = props.childWork;
  let price = work.price
    ? work.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      })
    : "N/A";
  // find out if it's sold out
  // cast work.sold_out to a boolean (it's a string = "true" or "false")
  let soldOut = work.sold_out === "true";

  // capitalize work.title
  let workTitleCapitalized = work.title.toUpperCase();

  if (soldOut) {
    if (props.hideSoldOut) {
      return <></>;
    }
  }

  // use Image class to get the image url
  const imageObj = new Image(work.imageID);
  const iconURL = imageObj.getIcon();

  return (
    <div
      className={
        soldOut
          ? `${styles.child} d-flex flex-row ${styles["sold-out"]}`
          : `${styles.child} d-flex flex-row`
      }
    >
      <div className={`${styles["child-content"]} d-flex justify-content-between w-100`}>
        <div className={`${styles["child-header"]} d-flex justify-content-start flex-column`} style={{width: '250px'}}>
          <h5 className={styles["child-title"]}>
            <a
              className="title"
              onClick={() => {
                setChildWorkPopupIsOpen(true);
              }}
            >
              {workTitleCapitalized}
            </a>
          </h5>
          <div className="pt-2">
            <div className="d-flex flex-row justify-content-between">
              <div className={`${styles["parent-detail-left"]} d-flex flex-start flex-column`}>
                <p className={`${styles["parent-detail"]}`}>{price}</p>

                {work.RYCA > 0 && !soldOut ? (
                  <p className={`${styles["parent-detail"]} pt-1`}>RYCA: {work.RYCA}</p>
                ) : (
                  <></>
                )}
              </div>
              <div className={`${styles["parent-detail-right"]}`}>
                {soldOut ? (
                  <p className={`${styles["parent-detail"]} ${styles["sold-out"]}`}>Sold Out</p>
                ) : (
                  <></>
                )}

                {work.examples > 0 && work.unsold > 0 && !soldOut ? (
                  <p className={`${styles["parent-detail"]}`}>
                    {work.examples} | {work.unsold} unsold
</p>
) : (
<></>
)}
</div>
</div>
</div>
</div>
<div className={`${styles["child-info"]} pe-2 d-flex flex-row`} style={{width: '40%'}}>
      <div className={`${styles["child-img"]}`} style={{marginRight: '2rem'}}>
        <img src={iconURL} alt={work.title} style={{width: 'auto', height: '60px', objectFit: 'contain', borderRadius: '0.25rem', maxWidth: '300px', cursor: 'pointer'}} />
      </div>
      <div>
        {visible ? (
          <span
            className={`${styles.circle} ${styles.green}`}
            onClick={() => {
              madeInvisible();
            }}
          >
            {" "}
          </span>
        ) : (
          <span
            className={`${styles.circle} ${styles.red}`}
            onClick={() => {
              madeVisible();
            }}
          >
            {" "}
          </span>
        )}
      </div>
    </div>

    <div className={`${styles.share} d-flex flex-column justify-content-around `} style={{width: '10%'}}>
      <Share
        size={20}
        onClick={() => {
          shareWork();
        }}
      />
      <Link
        size={20}
        onClick={() => {
          console.log("copy link");
        }}
      />
    </div>
  </div>

  <Toaster containerStyle={{ top: "50px" }} />
  {ChildWorkPopupIsOpen && (
    <ChildWorkPopup closePopup={closePopup} id={work.childID} work={work} />
  )}
</div>

);
}
export default Child;
