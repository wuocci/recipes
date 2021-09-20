import React, { useRef, useState } from 'react';
import SignUpForm from '../../components/forms/SignUpForm';
import SuccessfulRegistration from './SuccessfulRegistration';


const SignUpPage = () => {
    return (
        <div className="sign-up-page">
            <SignUpForm/>
          { /*  <SuccessfulRegistration/> */ }
        </div>
    )
}

export default SignUpPage;