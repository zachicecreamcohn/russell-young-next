// a react page for the login page
import React from 'react';

// import components
import RegisterLoginForm from '../../../../russell-young/src/components/RegisterLoginForm/RegisterLoginForm';
import Body from '../../../../russell-young/src/components/Body/Body';

function Login() {
    return (
        <>
            <Body center>
                {/* show the login form */}
                <RegisterLoginForm formType="login"/>
            </Body>
        </>



        


    );
    }

export default Login;

