import React, {useEffect, useState} from "react";

// import styles
import styles from "./InputSubmitPopup.module.css";

import SmallPopup from "../SmallPopup/SmallPopup";

import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function InputSubmitPopup(props) {

    const [inputValue, setInputValue] = useState("");

    const mandatoryProps = ["title", "closePopup", "submit"]
    const missingProps = mandatoryProps.filter(prop => props[prop] === undefined)

    if (missingProps.length > 0) {
        throw new Error(`Missing props in InputSubmitPopup: ${missingProps.join(", ")}`)
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleInputSubmit = () => {
        props.submit(inputValue);
        props.closePopup();
    }

    return (
        <SmallPopup title={props.title} closePopup={props.closePopup} styles={
            "width: 400px"}>
            <div className={styles.container}>
                <div className={styles.input}>
                    <TextField

                        id="outlined-basic"
                        label={props.inputLabel}
                        variant="outlined"
                        value={inputValue}
                        onChange={handleInputChange}
                        size="small"
                        fullWidth
                    />
                </div>
                <div className={styles.button}>
        
                    <button className={`theme-design`} onClick={handleInputSubmit}
                    disabled={(inputValue === "" ? true : false)}
                    >
                        {props.buttonLabel}
                    </button>

                </div>
            </div>
        </SmallPopup>
    );

}

export default InputSubmitPopup;

