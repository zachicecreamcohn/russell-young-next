import React from "react";

import styles from "./AddIcon.module.css";

import { Plus } from 'tabler-icons-react';

function AddIcon(props) {
    return (
        <div className={styles.container}
        style={{marginLeft: props.marginLeft}}
        >
            <Plus size={20} strokeWidth={1.5} onClick={props.onClick}/>
        </div>
    );
}

export default AddIcon;