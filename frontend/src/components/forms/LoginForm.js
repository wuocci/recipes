import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../../Notification';
import authService from '../../services/authservice' 
import { useHistory } from "react-router-dom";


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassWord] = useState('')
    const [errorMessage, setMessage] = useState('')
    const [showNotification, setNotification] = useState(false)
    const history = useHistory();


    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassWord(event.target.value);
    };

    //simple login check for later authentication and stuff
     const checkLogin = async (event) => {   
        event.preventDefault()
        authService.login(username, password).then(
            () => {
                history.push("/");
                window.location.reload();
            },
            (error) => {
            setNotification(true)
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setMessage(resMessage);
            }
        );
        setUsername("");
        setPassWord("");
      }

    return (
        <form className="login-form" onSubmit={checkLogin}>
            {showNotification && 
            <Notification 
                showNotification={showNotification}
                setNotification={setNotification}
                errorMessage={errorMessage}
                type="error"
            /> 
            }  
            <h1>Login</h1>
            <TextField
                value={username}
                onChange={handleUsername}
                id="standard-username"
                label="Username"
                variant="outlined"
            />
            <TextField
                value={password}
                onChange={handlePassword}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
            />
            <Button variant="contained" color="primary" type="submit" >
                Login
            </Button> 
            <p>Forgot <a href="">password?</a></p>
        </form>
    );
  }
  
export default LoginForm;
  