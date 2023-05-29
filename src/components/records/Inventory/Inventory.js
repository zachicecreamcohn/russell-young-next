import React from "react";
import styles from "./Inventory.module.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useEffect, useState } from "react";
import SkeletonTable from "../SkeletonTable/SkeletonTable";


function Inventory(props) {
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        console.log("Inventory component mounted");
        props.setRightContent(null);
    }, []);

    return (
        <div className={styles.container}>
            {
                dataLoaded ? (
                    <p>Inventory</p>
                ) : (
                    <SkeletonTable />
                )
            }
        </div>
    );
}

export default Inventory;
