import React from "react";

import styles from "./create-account.module.css";
import Body from "@/components/Body/Body";
import CreateAccount from "@/components/CreateAccount/CreateAccount";

function CreateAccountPage() {

    return (
        <Body center h-80>
            {/* <div className={styles.container}> */}
                <CreateAccount />
            {/* </div> */}
        </Body>
    );
}

export default CreateAccountPage;

