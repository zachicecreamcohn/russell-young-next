import React from "react";
import { X } from 'tabler-icons-react';
// import styles
import styles from "./SmallPopup.module.css";



function SmallPopup(props) {



    const mandatoryProps = ["title", "closePopup"]
    const missingProps = mandatoryProps.filter(prop => props[prop] === undefined)
    if (missingProps.length > 0) {
        throw new Error(`Missing props in SmallPopup: ${missingProps.join(", ")}`)
    }



    return (
        <div className={styles.container}
        >
            <div className={styles.popup}
        style={{width: props.width}}
        >
                <div className={styles.header}>
                    <div className={styles.top}>
                    <div className={styles.title}>
                        {props.title}
                    </div>
                    <div className={styles.close} onClick={props.closePopup}>
                        <X size={20} strokeWidth={1} />
                    </div>
                </div>
                </div>
                <div className={styles.bottom}>
                    {props.subtitle && (
                    <div className={styles.subtitle}>
                        <i>{props.subtitle}</i>
                    </div>
                    )}
                </div>

                <span className={styles.spacer}></span>

                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
        </div>
    );
    
}

export default SmallPopup;