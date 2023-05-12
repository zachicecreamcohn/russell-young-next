// a react page for the login page
import React from 'react';

// import components
import Body from '@/components/Body/Body';
import RequestLoginForm from '@/components/RegisterLoginForm/RequestLoginForm';
function Login() {
    return (
        <>
            <Body center h-80>
                {/* show the login form */}
                <RequestLoginForm formType="login"/>
            </Body>
        </>



        


    );
    }

export default Login;

