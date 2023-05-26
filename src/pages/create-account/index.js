import React from "react";
import {useEffect, useState} from "react";
import styles from "./create-account.module.css";
import Body from "@/components/Body/Body";
import CreateAccount from "@/components/CreateAccount/CreateAccount";

function CreateAccountPage() {
    const [validToken, setValidToken] = useState(true);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);

    function verifyToken(token) {
        fetch("/api/userManagement/verifyNewAccountToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setValidToken(true);
                setEmail(data.email);
            } else {
                setValidToken(false);
            }
        })
        .catch((error) => {
            console.log(error);
            setValidToken(false);
        });
        }

    

    // when page loads, get token from url
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            setToken(token);

        }

        verifyToken(token);
    }, []);



    return (
        <Body center h-80>
            {token ? (

                validToken ? (
                    <CreateAccount token={token} email={email}/>
                ) : (
                    <div className={styles.invalidToken}>
                        <h1>Invalid Token</h1>
                        <p>The token you have provided is invalid. Please check your email and try again.</p>
                    </div>
                )
            ) : (
                <CreateAccount/>
            )}

        </Body>
    );
}

export default CreateAccountPage;

