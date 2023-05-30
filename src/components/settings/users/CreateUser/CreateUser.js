import React, { useState, useEffect } from "react";
import styles from "./CreateUser.module.css";
import { Send } from 'tabler-icons-react';
        
import { TextField, TextareaAutosize } from "@mui/material";
import { Autocomplete } from "@mui/material";

function CreateUser(props) {

    const [validEmail, setValidEmail] = useState(false);
    const [email, setEmail] = useState("");
    function validateEmail(email) {
        // Regular expression pattern for email validation
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        // Check if the email matches the pattern
        if (emailPattern.test(email)) {
          return true; // Email is valid
        } else {
          return false; // Email is invalid
        }
      }

        function handleSend(e) {
            if (!validEmail) {
                props.alertError("Email incorrectly formed.");
                return;
            }
            fetch("/api/settings/users/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    props.alertSuccess("User created.");
                } else {
                    props.alertError("Error creating user.");
                }
            }
            )
        }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Create Account</p>

            <div className={styles.inputContainer}>

            <TextField
                
                label="Email"
                variant="outlined"
                size="small"
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
                onChange={(event) => {
                    if (validateEmail(event.target.value)) {
                        setValidEmail(true);
                    } else {
                        setValidEmail(false);
                    }
                    setEmail(event.target.value);
                }}
            />
            <Send 
            {...(validEmail ? { onClick: () => console.log("send") } : {})}
            onClick={handleSend}

            size={24} className={styles.sendIcon + " " + (validEmail ? "" : styles.disabled)} />
            </div>
                </div>

    )
}

export default CreateUser;