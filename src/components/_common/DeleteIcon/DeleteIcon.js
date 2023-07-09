import React from "react";

import styles from "./DeleteIcon.module.css";

import { Trash } from 'tabler-icons-react';

function DeleteIcon(props) {
    return (
        <div className={styles.container}         style={{marginLeft: props.marginLeft}}>
            <Trash size={20} strokeWidth={1} onClick={props.onClick}/>
        </div>
    );
}

export default DeleteIcon;