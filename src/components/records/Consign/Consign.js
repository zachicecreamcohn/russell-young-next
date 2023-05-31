import React, { useState, useEffect } from "react";

import styles from "./Consign.module.css";
import { ArrowRight } from "tabler-icons-react";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { TextField, Autocomplete, TextareaAutosize } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ConsigneeInput from "../ConsigneeInput/ConsigneeInput";
import Dayjs from "dayjs";

function Consign(props) {
  const [consignees, setConsignees] = useState([]);
  const [selectedConsigneeFrom, setSelectedConsigneeFrom] = useState(null);
  const [selectedConsigneeTo, setSelectedConsigneeTo] = useState(null);
  const [date, setDate] = useState(Dayjs());


  function handleFromChange(value) {
    if (value === null) {
      setSelectedConsigneeFrom(null);
      return;
    }
    setSelectedConsigneeFrom(value);
  }

  function handleToChange(value) {
    if (value === null) {
      setSelectedConsigneeTo(null);
      return;
    }
    setSelectedConsigneeTo(value);
  }

  function showAllConsignFields() {
    const container = document.querySelector(`.${styles.container}`);
    container.classList.add(styles["show-all-fields"]);
    // after 200ms, show the other fields
    setTimeout(() => {
      const bottom = document.querySelector(`.${styles.bottom}`);
      bottom.classList.add(styles["visible"]);
    }, 275);
  }

  function hideAllConsignFields() {
    // hide the other fields
    const bottom = document.querySelector(`.${styles.bottom}`);
    bottom.classList.remove(styles["visible"]);
    // after 200ms, hide the other fields
    setTimeout(() => {
      const container = document.querySelector(`.${styles.container}`);
      container.classList.remove(styles["show-all-fields"]);
    }, 200);
  }

  useEffect(() => {
    // if both consignees are selected, show all fields
    if (
      selectedConsigneeFrom &&
      selectedConsigneeTo
    ) {
      showAllConsignFields();
    } else {
      hideAllConsignFields();
    }
  }, [selectedConsigneeFrom, selectedConsigneeTo]);


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <ConsigneeInput
          className={styles["consignee-from-autocomplete"]}
          onChange={handleFromChange}
        />

        <ArrowRight
          size={22}
          style={{ margin: "auto 10px", cursor: "default" }}
        />

        <ConsigneeInput
          className={styles["consignee-to-autocomplete"]}
          onChange={handleToChange}
        />
      </div>
      <div className={styles.bottom}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className={styles.datepicker}
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  //   width: 300,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
                size="small"
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
          }}
          size="small"
          placeholder="Notes"
        />

        <button className={`theme-design ${styles["consign-btn"]}`}>Add</button>
      </div>
    </div>
  );
}

export default Consign;
