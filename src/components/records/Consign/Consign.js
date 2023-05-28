import React, { useState, useEffect } from "react";

import styles from "./Consign.module.css";
import { ArrowRight } from "tabler-icons-react";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { TextField, Autocomplete, TextareaAutosize } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dayjs from "dayjs";

function Consign(props) {
  const [consignees, setConsignees] = useState(["test", "test2"]);
  const [selectedConsigneeFrom, setSelectedConsigneeFrom] = useState([]);
  const [selectedConsigneeTo, setSelectedConsigneeTo] = useState([]);
  const [date, setDate] = useState(Dayjs());

  function handleFromChange(event, values) {
    setSelectedConsigneeFrom(values);
    // props.onChange(values);
  }

  function handleToChange(event, values) {
    setSelectedConsigneeTo(values);
    // props.onChange(values);
  }

  function showAllConsignFields() {
    const container = document.querySelector(`.${styles.container}`);
    container.classList.add(styles["show-all-fields"]);
    }

    function hideAllConsignFields() {
        const container = document.querySelector(`.${styles.container}`);
        container.classList.remove(styles["show-all-fields"]);
    }


  useEffect(() => {
    // if both consignees are selected, show all fields
    if (selectedConsigneeFrom.length > 0 && selectedConsigneeTo.length > 0) {
        showAllConsignFields();
    } else {
        hideAllConsignFields();
    }
    }, [selectedConsigneeFrom, selectedConsigneeTo]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Autocomplete
          sx={{
            width: 300,
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
          multiple
          id="tags-outlined"
          options={consignees}
          getOptionLabel={(option) => option}
          onChange={handleFromChange}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} placeholder="From" />}
          size="small"
        />
        <ArrowRight
          size={22}
          style={{ margin: "auto 10px", cursor: "default" }}
        />
        <Autocomplete
          sx={{
            width: 300,
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
          multiple
          id="tags-outlined"
          options={consignees}
          getOptionLabel={(option) => option}
          onChange={handleToChange}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} placeholder="To" />}
          size="small"
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
