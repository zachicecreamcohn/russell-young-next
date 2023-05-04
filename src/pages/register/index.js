// a react page for the login page
import React from 'react';

// import components
import Body from '@/components/Body/Body';
import RegisterLoginForm from '@/components/RegisterLoginForm/RegisterLoginForm';


function Register() {
    return (
        <>
            <Body center>
                {/* show the login form */}
                <RegisterLoginForm formType="register"/>
            </Body>
        </>


    );
    }

export default Register;

