import React, {useEffect, useState} from "react";

import styles from "./TestComponent.module.css";


export default function TestComponent(props) {

    return (
        <div className={styles.container}>
        <h1>{props.message}</h1>
        </div>
    );
    }



