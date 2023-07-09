import React, {useEffect, useState} from "react";


import styles from "./AddParentPopup.module.css";

import SmallPopup from "../SmallPopup/SmallPopup";

import toast, { Toaster } from 'react-hot-toast';

import { TextField } from "@mui/material";


function AddParentPopup(props) {
    function alertError(message) {
        toast.error(message, {
          style: {
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
          },
          position: "top-center",
        });
      }
    
      function alertSuccess(message) {
        toast.success(message, {
          style: {
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
          },
          position: "top-center",
        });
      }

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [medium, setMedium] = useState("");
    const [size, setSize] = useState("");
    const [notes, setNotes] = useState("");


    const handleAddParent = () => {

        fetch('/api/parents/addParent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: title, subTitle: subtitle, description: description, year: year, medium: medium, size: size, seriesID: props.seriesID, notes: notes}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alertSuccess("Added " + title);
                } else {
                    alertError("Error adding " + title);
                }
            });


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
        
            if (year.length < 4 || title === "") {
                return true;
            }
            return false;
        }


    return (
        <>
      <Toaster containerStyle={{ top: "50px" }} />
        <SmallPopup
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
                    label="Subtitle"
                    variant="outlined"
                    onChange={(event) => setSubtitle(event.target.value)}
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
                    required
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
                <TextField
                    label="Notes"
                    variant="outlined"
                    onChange={(event) => setNotes(event.target.value)}
                    multiline
                    rows={4}
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