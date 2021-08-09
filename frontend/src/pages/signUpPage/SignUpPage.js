import React, { useRef, useState } from 'react';
import logo from '../../img/logoRecipeBox.svg'
import SignUpForm from '../../components/forms/SignUpForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const LoginPage = () => {
    return (
        <div className="login-page">
            <Link to="/">
                <img src={logo} alt="logo of the brand"></img>
            </Link>
            <SignUpForm />
        </div>
    )
}

export default LoginPage;