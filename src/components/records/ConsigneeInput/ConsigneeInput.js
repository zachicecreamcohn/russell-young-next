import React, { useState, useEffect } from "react";

import styles from "./ConsigneeInput.module.css";

import { TextField, Autocomplete, TextareaAutosize } from "@mui/material";

function ConsigneeInput(props) {
  const [consignees, setConsignees] = useState(null);
  const [selected, setSelected] = useState(null);


  // when used in another component, the parent component can pass in "onChange" as a prop
  // this function will be called when the consignee is changed
  function handleChange(event, value) {
    setSelected(value);
    if (props.onChange) {
      props.onChange(value);
    }
  }

  useEffect(() => {
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

          // now, sort alphabetically
            consignees.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (b.name < a.name) {
                    return 1;
                }
                return 0;
            });

    
    
    
          setConsignees(consignees);
        }
        }
        getConsignees();
    }, []);



  return (
    <Autocomplete
      className={props.className}
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
      renderOption={(props, option) => (
        <li {...props} className={styles["autocomplete-option"]}>
          <span>{option.name}</span>
          <span className={styles.initials}>{option.initials}</span>
        </li>
      )}
      options={consignees}
      getOptionLabel={(option) => option.name}
      onChange={handleChange}
      filterSelectedOptions
      renderInput={(params) => <TextField {...params} placeholder={props.placeholder || ""} />}
      size="small"
      placeholder={props.placeholder || ""}
    />
  );
}

export default ConsigneeInput;
