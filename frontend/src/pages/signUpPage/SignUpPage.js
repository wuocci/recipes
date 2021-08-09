import React, { useRef, useState } from 'react';
import logo from '../../img/logoRecipeBox.svg'
import SignUpForm from '../../components/forms/SignUpForm';


const LoginPage = () => {
    return(
        <div className="login-page">
            <img src={logo} alt="logo of the brand"></img>
            <SignUpForm/>
        </div>
    )
}

export default LoginPage;