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



  return (
    <div className={styles.container + " " + styles['show-all-fields']}>
      <div className={styles.top}>
        <ConsigneeInput
          className={styles["consignee-from-autocomplete"]}
          onChange={handleFromChange}
          placeholder="From"
        />

        
        <ConsigneeInput
          className={styles["consignee-to-autocomplete"]}
          onChange={handleToChange}
          placeholder="To"
        />
      </div>
      <div className={styles.bottom + " " + styles.visible}>
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
        <ArrowRight
          size={22}
          style={{ margin: "auto 10px", cursor: "default" }}
        />

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



        {/* <button className={`theme-design ${styles["consign-btn"]}`}>Add</button> */}
      </div>
    </div>
  );
}

export default Consign;
