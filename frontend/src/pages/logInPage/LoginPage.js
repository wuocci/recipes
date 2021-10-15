import React from "react";
import logo from "../../img/logoRecipeBox.svg";
import LoginForm from "../../components/forms/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-page">
      <Link to="/">
        <img src={logo} alt="logo of the brand"></img>
      </Link>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
