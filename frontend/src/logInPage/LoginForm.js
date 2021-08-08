import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../Notification'
import logo from '../logo/logoRecipeBox.svg'


const LoginForm = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassWord] = useState(null)
    const showError = useRef(false)

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassWord(event.target.value);
    };

     //simple login check for later authentication and stuff
    const checkLogin = () => {
        if(username === null || password === null){ 
           console.log("invalid")
        }
        else{
            console.log(username)
            console.log(password)
        }
    }

    return (
      <div className="login-page">
          <img src={logo} alt="logo of the brand"></img>
        {showError &&
            <Notification 
                showError={showError}
                errorMessage={"Invalid username or password"}
                type="error"
            /> 
        }  
        <div className="login-form">
            <h1>Login</h1>
            <TextField
                onChange={handleUsername}
                id="standard-username"
                label="Username"
            />
            <TextField
                onChange={handlePassword}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
            />
            <Button variant="contained" color="primary" onClick={checkLogin}>
                Login
            </Button> 
        </div>
      </div>
    );
  }
  
export default LoginForm;
  