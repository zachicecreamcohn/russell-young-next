import React, {useEffect, useState} from "react";


import styles from "./AddParentPopup.module.css";

import SmallPopup from "../SmallPopup/SmallPopup";

import { TextField } from "@mui/material";


function AddParentPopup(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [medium, setMedium] = useState("");
    const [size, setSize] = useState("");


    const handleAddParent = () => {
        console.log(title, description, year, medium, size);
        props.closePopup();
    }
    const handleYearChange = (event) => {
        const inputYear = event.target.value;
        // Remove any non-digit characters from the input
        let cleanedYear = inputYear.replace(/\D/g, '');
        // If the year is longer than 4 digits, truncate it
        if (cleanedYear.length > 4) {
            cleanedYear = cleanedYear.substring(0, 4);
        }
        setYear(cleanedYear);
      };


      const disabledButton = () => {
        if (year !== "") {
            if (year.length < 4 || title === "") {
                return true;
            }
        }

        if (title === "") {
            return true;
        }
        return false;
    }


    return (
        <><SmallPopup
            title="New Parent"
            open={props.open}
            closePopup={props.closePopup}
        >
            <div className={styles.container}>
                <TextField
                    label="Title"
                    variant="outlined"
                    onChange={(event) => setTitle(event.target.value)}
                    size="small"
                    fullWidth
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    onChange={(event) => setDescription(event.target.value)}
                    multiline
                    rows={4}
                    size="small"
                    fullWidth

                />
                <TextField

                    label="Year"
                    variant="outlined"
                    onChange={handleYearChange}
                    value={year}
                    placeholder="YYYY"
                    size="small"
                    fullWidth
                    error={year.length < 4 && year.length > 0}
                />
                <TextField

                    label="Medium"
                    variant="outlined"
                    placeholder="Oil on canvas"
                    onChange={(event) => setMedium(event.target.value)}
                    size="small"
                    fullWidth
                />
                <TextField
                    label="Size"
                    variant="outlined"
                    onChange={(event) => setSize(event.target.value)}
                    placeholder="24 x 36"
                    size="small"
                    fullWidth
                />




            </div>
            <button className={"theme-design " + styles.button} onClick={handleAddParent} style={{width: "100%"}}
            disabled={disabledButton()}
            >
            
        
                CREATE
            </button>
        </SmallPopup>
        </>
    );
}

export default AddParentPopup;