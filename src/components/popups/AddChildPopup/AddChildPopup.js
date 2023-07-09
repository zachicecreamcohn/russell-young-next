import React, { useState } from "react";

import styles from "./AddChildPopup.module.css";

import SmallPopup from "../SmallPopup/SmallPopup";
import HoverImageUpload from "@/components/uploads/HoverImageUpload/HoverImageUpload";
import DropFileInput from "@/components/uploads/DropFileInput/DropFileInput";
import { width } from "@mui/system";

import Upload from "@/common/util/Cloudflare/Upload";
import { TextField, InputAdornment } from "@mui/material";

import {CircularProgress} from "@mui/material";

import { Tex } from "tabler-icons-react";

function AddChildPopup(props) {

    const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [tags, setTags] = useState([]); //TODO: implement tags
  const [file, setFile] = useState([]);
  const [price, setPrice] = useState(0);

  const disabledButton = () => {
    return !color || !price || !file;
  };

  const handlePriceChange = (event) => {
    // validate price. only allow numbers and decimals (max 2)
    const regex = /^[0-9]+(\.[0-9]{0,2})?$/;
    if (regex.test(event.target.value)) {
      setPrice(event.target.value);
    }
  };
  

  const submit = () => {
    console.log("submit");
    fetch("/api/children/addChild", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: color,
        parentID: props.parentID,
        file: file,
        price: price,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.success) {
          console.log("success");

          // upload image (if any)
            if (file.length > 0) {
                const uploadObj = new Upload(file[0], data.childID);
                await uploadObj.upload();
            }


            // TODO: do this without a reload
            props.closePopup();

            window.location.reload();
        } else {
          console.log("error");
        }
      });

  };

  return (
    <SmallPopup width={"550px"} title="New Child" closePopup={props.closePopup}>
        {loading ? <div className={styles.centerContainer}> <CircularProgress /></div> : null}
      
      {!loading && (<div className={styles.container}>
        <TextField
          label="Color"
          variant="outlined"
          onChange={(event) => setColor(event.target.value)}
          size="small"
          fullWidth
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          onChange={handlePriceChange}
          value={price}
          size="small"
          fullWidth
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <div className={styles.inputContainer}>
          <DropFileInput file={file} setFile={setFile} />
        </div>
        <button
          className="theme-design"
          disabled={disabledButton()}
          onClick={submit}
          style={{ width: "100%", marginTop: "20px" }}
        >
          ADD CHILD
        </button>
      </div>
        )}
    </SmallPopup>

        
  );
}

export default AddChildPopup;
