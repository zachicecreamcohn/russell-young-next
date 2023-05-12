import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
// import styles
import toast, { Toaster } from "react-hot-toast";
import styles from './RequestLoginForm.module.css';
// this is a component that will be used on the login and register pages
// it takes in a prop called "formType" which will be either "login" or "register"




function RequestLoginForm(props) {

    function alertError(message) {
        toast.error(message, {
            style: {
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
            },
            position: "top-center",
        });
    }

    function alertSuccess(message) {
        toast.success(message, {
            style: {
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
            },
            position: "top-center",
        });
    }


    const [requestSubmitted, setRequestSubmitted] = useState(false); // show the request submitted message


    async function requestAccess() {
        const name = document.getElementById("request-access-name").value;
        const email = document.getElementById("request-access-email").value;

        fetch("/api/userManagement/requestAccess", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name: name,
                email: email
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setRequestSubmitted(true);
                    alertSuccess(data.message);
                } else {
                    alertError(data.message);
                }
            });

    }

    async function login() {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        fetch("/api/userManagement/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    window.location.href = "/series";
                } else {
                    alertError(data.message);
                }
            }
            );

    }


    async function handleFormSubmit(event) {
        // prevent default form submission
        event.preventDefault();

        if (props.formType === "request") {
            requestAccess();
        } else {
            login();
        }
    }

    return (
        <>
        <div className={styles.registerLoginForm}>
            {/* show the form title */}
            {/* show the form */}
            <div className={styles.form}>
                <form onSubmit={(event) => handleFormSubmit(event)}>
                {/* if the form is register, show "REQUEST ACCESS". Otherwise, show "ENTER CREDS" */}

                {props.formType === "request" ? <h1>REQUEST ACCESS</h1> : <h1>ENTER <br/>CREDENTIALS</h1>}


                {/* if the form is a register form, show an input for email. Otherwise, show the other things */}
                {props.formType === "request" ? 
                <>
                <input className="theme-design"  id="request-access-name" type="text" placeholder="full name" required/>
                <input className="theme-design"  id="request-access-email" type="Email" placeholder="email" required/> 
                </>:
                <>
                    <input type="text" className="theme-design" id="login-email" placeholder="username or email" required/>
                    <input type="password" className="theme-design" id="login-password" placeholder="password" required/>
                    {/* <a href="/forgot-password">Forgot Password?</a> */}
                </> 
                }


               
                <button type="submit" className="theme-design" value={props.formType.toUpperCase()}
                >SUBMIT</button>
                </form>
                 
                 <div className={styles.secondaryActionMessage}>
                    {/* If the form is register, show the option to login. Otherwise, show a request access option */}
                    {props.formType === "request" ? <p>Already have an account? <Link href="/login">Login</Link></p> : 
                    
                    <><p><Link href="/request-access">
                    Request Access
                  </Link>
                  </p></>}
                 </div>
                
               
            </div>
        </div>
          <Toaster containerStyle={{ top: "50px" }} />
          </>
               
    );
}

export default RequestLoginForm;