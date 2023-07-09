import React, {useEffect, useState} from "react";

import styles from "./AddSeriesPopup.module.css";

import SmallPopup from "../SmallPopup/SmallPopup";
import { TextField } from "@mui/material";


function AddSeriesPopup(props) {


    const [seriesInput, setSeriesInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");


    const handleSeriesInputChange = (event) => {
        setSeriesInput(event.target.value);
    }

    const handleDescriptionInputChange = (event) => {
        setDescriptionInput(event.target.value);
    }

    const handleAddSeries = () => {
        fetch('/api/series/addSeries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({seriesName: seriesInput, description: descriptionInput}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (data.seriesExists) {
                        alertError("Series already exists");
                    } else {
                        props.alertSuccess("Series added successfully");
                        props.closePopup();
                    }
                } else {
                    props.alertError("Error adding series");
                }
            }

            );
    }

    return (
        <><SmallPopup

            closePopup={props.closePopup}
            title="Add Series"
            width="450px"
        >


            <div className={styles.container}>
                <TextField

                    label="Series Name"
                    variant="outlined"
                    value={seriesInput}
                    onChange={handleSeriesInputChange}
                    className={styles.input}
                    size="small"
                    required />
                <TextField
                    label="Description"
                    variant="outlined"
                    value={descriptionInput}
                    onChange={handleDescriptionInputChange}
                    className={styles.input}
                    multiline
                    rows={4}
                    maxRows={4}
                    size="small" />

                <button className={"theme-design " + styles.button} onClick={handleAddSeries}
                    disabled={(seriesInput === "" ? true : false)}
                >
                    Add Series
                </button>
            </div>

        </SmallPopup></>

);
}

export default AddSeriesPopup;