import React, { useRef, useState } from 'react';
import logo from '../../img/logoRecipeBox.svg'
import LoginForm from '../../components/forms/LoginForm';


const LoginPage = () => {
    return(
        <div className="login-page">
            <img src={logo} alt="logo of the brand"></img>
            <LoginForm/>
        </div>
    )
}

export default LoginPage;