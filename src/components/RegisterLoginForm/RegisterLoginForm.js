import React from 'react';

// import styles
import "./RegisterLoginForm.css";
// this is a component that will be used on the login and register pages
// it takes in a prop called "formType" which will be either "login" or "register"


function RegisterLoginForm(props) {
    return (
        <div className="registerLoginForm">
            {/* show the form title */}
            {/* show the form */}
            <div className="form">
                {/* if the form is register, show "REQUEST ACCESS". Otherwise, show "ENTER CREDS" */}

                {props.formType === "register" ? <h1>REQUEST ACCESS</h1> : <h1>ENTER <br/>CREDENTIALS</h1>}


                {/* if the form is a register form, show an input for email. Otherwise, show the other things */}
                {props.formType === "register" ? <input className="theme-design"  type="Email" placeholder="email"/> :
                <>
                    <input type="text" className="theme-design" placeholder="username or email" />
                    <input type="password" className="theme-design" placeholder="password" />
                    {/* <a href="/forgot-password">Forgot Password?</a> */}
                </> 
                }


               
                <button className="theme-design" value={props.formType.toUpperCase()}>SUBMIT</button>
                 
                 <div className='secondaryActionMessage'>
                    {/* If the form is register, show the option to login. Otherwise, show a request access option */}
                    {props.formType === "register" ? <p>Already have an account? <a href="/login">Login</a></p> : 
                    
                    <><p><a href="/register">Request Access</a></p></>}
                 </div>
                
               
            </div>
        </div>
    );
}

export default RegisterLoginForm;