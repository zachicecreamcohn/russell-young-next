// a react page for the login page
import React from 'react';
import {useState } from 'react';
// import components
import Body from '@/components/Body/Body';
import RequestLoginForm from '@/components/RegisterLoginForm/RequestLoginForm';


function Request() {
    const [alertObj, setAlertObj] = useState(null);
    return (
        <>
            <Body center h-80 alert={alertObj}>
                {/* show the login form */}
                <RequestLoginForm formType="request"
                setAlert={setAlertObj}
                />
            </Body>
        </>


    );

    }

export default Request;

