import React from "react";
import styles from "./Consignment.module.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useEffect, useState } from "react";

import SkeletonTable from "../SkeletonTable/SkeletonTable";

function Consignment(props) {

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        console.log("Consignment component mounted");
    }, []);

    return (
        <div className={styles.container}>
            {
                dataLoaded ? (
                    <p>Consignment</p>
                ) : (
                    <SkeletonTable />
                )
            }
        </div>
    );
}

export default Consignment;
