import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../../Notification'


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
        <div className="login-form">
            {showError && 
            <Notification 
                showError={showError}
                errorMessage={"Invalid username or password"}
                type="error"
            /> 
            }  
            <h1>Login</h1>
            <TextField
                onChange={handleUsername}
                id="standard-username"
                label="Username"
                variant="outlined"
            />
            <TextField
                onChange={handlePassword}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={checkLogin}>
                Login
            </Button> 
            <p>Forgot <a href="">password?</a></p>
        </div>
    );
  }
  
export default LoginForm;
  