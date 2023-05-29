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





  async function getConsignees() {
    const response = await fetch("/api/records/consignment/consignees");
    const data = await response.json();
    if (data.success) {

      let consignees = [];
      data.consignees.forEach((consignee) => {
        consignees.push({
          id: consignee.dealerid,
          name: consignee.dealer,
          initials: consignee.initials,
        });


      });



      setConsignees(consignees);
    }

  }

  useEffect(() => {
    getConsignees();
  }, []);

  function handleFromChange(event, values) {
    let selected = {};
    const selectedValues = Array.isArray(values) ? values : [values];
    
    selectedValues.forEach((value) => {
      if (value) {
        selected[value.dealerid] = value;
      }
    });
    setSelectedConsigneeFrom(selected);
  }
  function handleToChange(event, values) {
    let selected = {};
    const selectedValues = Array.isArray(values) ? values : [values];
    selectedValues.forEach((value) => {
      if (value) {
        selected[value.dealerid] = value;
      }
    });
    setSelectedConsigneeTo(selected);
  }
  

  function showAllConsignFields() {
    const container = document.querySelector(`.${styles.container}`);
    container.classList.add(styles["show-all-fields"]);
    // after 200ms, show the other fields
    setTimeout(() => {
        const bottom = document.querySelector(`.${styles.bottom}`);
        bottom.classList.add(styles["visible"]);
    }
    , 275);
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
        Object.keys(selectedConsigneeFrom).length > 0 &&
        Object.keys(selectedConsigneeTo).length > 0
      ) {
        showAllConsignFields();
      } else {
        hideAllConsignFields();
      }
    }, [selectedConsigneeFrom, selectedConsigneeTo]);
    


    function evenSpacingInitials(initials) {
      if (initials.length < 3) {
        const whitespace = " ".repeat(3 - initials.length); // Calculate the number of whitespace characters needed
        return `${initials}${whitespace}`;
      }
      return initials.slice(0, 3); // Take the first 3 characters of the initials
    }
    

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
  id="tags-outlined"
  renderOption={(props, option) => (
    <li {...props} className={styles['autocomplete-option']}>
        <span>{option.name}</span>
        <span className={styles.initials}>{option.initials}</span>
    </li>
  )}
  options={consignees}
  getOptionLabel={(option) => option.name}

  onChange={handleToChange}
  filterSelectedOptions
  renderInput={(params) => <TextField {...params} placeholder="To" />}
  size="small"
  placeholder="From"
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
  id="tags-outlined"
  renderOption={(props, option) => (
    <li {...props} className={styles['autocomplete-option']}>
        <span>{option.name}</span>
        <span className={styles.initials}>{option.initials}</span>
    </li>
  )}
  options={consignees}
  getOptionLabel={(option) => option.name}

  onChange={handleFromChange}
  filterSelectedOptions
  renderInput={(params) => <TextField {...params} placeholder="From" />}
  size="small"
  placeholder="To"
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
