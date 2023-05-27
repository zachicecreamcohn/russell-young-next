import React from "react";
import styles from "./CreateAccount.module.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
function CreateAccount(props) {
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


    async function handleButton(event) {

        // prevent default form submission
        event.preventDefault();

        
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const company = document.getElementById("company").value;

        if (password !== confirmPassword) {
            alertError("Passwords do not match.");
            return;
        }

try {
        fetch("/api/userManagement/createAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                company: company ? company : null,
                token : props.token ? props.token : null
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alertSuccess(data.message + " Redirecting to login page.");
                    // redirect to login page
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1000);
                } else {
                    alertError(data.message);
                }
            }
            );
        } catch (e) {
            alertError("Unknown Error. Check console.");
        }
            


    }

  return (
    <>
      <div className={styles.container}>
        <form
        onSubmit={(event) => handleButton(event)}
        >
        { props.token ? (
        <h1>ENTER ACCOUNT DETAILS</h1>
        ) : (
        <h1>CREATE ACCOUNT</h1>
        )}
        <input className="theme-design" id="first-name" type="text" placeholder="first name *" required/>
        <input className="theme-design" id="last-name" type="text" placeholder="last name *" required/>
        <input className="theme-design" id="email" type="email" placeholder="email *" required
            {...props.token && {value: props.email}}
            // if props.token and props.email are defined, then also display the email
            {...props.token && {readOnly: true}}
        />
        <input className="theme-design" id="company" type="text" placeholder="company" />

        <input
          className="theme-design"
          type="password"
          placeholder="password *"
          id="password"
          required
        />
        <input
          className="theme-design"
          type="password"
          placeholder="confirm password *"
            id="confirm-password"
            required
        />
        <button type="submit" className="theme-design"
        >CREATE ACCOUNT</button>
 
        </form>
        <div className={styles.secondaryActionMessage}>
          <Link href="/login">Login</Link>
        </div>
      </div>
      <Toaster containerStyle={{ top: "50px" }} />
    </>
  );
}

export default CreateAccount;
