import React, {useEffect, useState} from "react";
import styles from "./DefaultSeriesOrder.module.css";
import { TextField, MenuItem } from "@mui/material";
function DefaultSeriesOrder(props) {
    const [defaultSeriesSortOrder, setDefaultSeriesSortOrder] = useState([]);
    const dataToSave = props.dataToSave;
    const setDataToSave = props.setDataToSave;

    function updateDefaultSeriesSortOrder() {
        setDataToSave((prevState) => ({
            ...prevState,
            defaultSeriesSortOrder: defaultSeriesSortOrder,
        }));
    }

    useEffect(() => {
        updateDefaultSeriesSortOrder();
    }, [defaultSeriesSortOrder]);


    return (
        <><p className={styles.title}>
            Set Default Series Order
        </p><TextField
            id="outlined-select-series"
            select
            value={defaultSeriesSortOrder.length ? defaultSeriesSortOrder : "A → Z"}
            onChange={(event) => setDefaultSeriesSortOrder(event.target.value)}
            variant="outlined"
            size="small"
            sx={{
                width: 150,
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
        >
                <MenuItem value={"A → Z"}>A → Z</MenuItem>
                <MenuItem value={"Z ← A"}>Z ← A</MenuItem>
                <MenuItem value={"Time →"}>Time →</MenuItem>
                <MenuItem value={"Time ←"}>Time ←</MenuItem>
            </TextField></>
    )
}

export default DefaultSeriesOrder;