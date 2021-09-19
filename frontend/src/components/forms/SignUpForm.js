import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../../Notification'
import authService from '../../services/authservice'
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassWord] = useState("")
    const [emailAddress, setEmail] = useState("")
    const successfull = useRef(null)
    const [errorMessage, setMessage] = useState("")
    const history = useHistory()
    

    //function for checking sign up data etc. for later usage.
    const submitSignUp = (event) => {
        event.preventDefault()
        if(username === null || password === null || emailAddress === null){ 
           console.log("invalid")
        }
        else{
            authService.register(username, emailAddress, password).then(
                (response) => {
                  setMessage(response.data.message);
                  successfull.current = true
                  history.push("/login");
                  window.location.reload();
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
        
                  setMessage(resMessage);
                  successfull.current = false
                }
            );
        }
        
        setUsername("")
        setPassWord("")
        setEmail("")
    }

    return(
        <form className="sign-up-form" onSubmit={submitSignUp}>
            <div>
            {successfull !== null ?
            <Notification 
                showError={successfull}
                errorMessage={errorMessage}
                type="error"
            /> 
            :
            <Notification 
                showError={successfull}
                errorMessage={errorMessage}
                type="success"
            /> 
            }  
            </div>
            <h1>Create Account</h1>
            <TextField
                value={emailAddress}
                required
                onChange={(e) => setEmail(e.target.value)}
                id="standard-email"
                label="Email"
                variant="outlined"
            />
            <TextField
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                id="standard-username"
                label="Username"
                variant="outlined"
            />
            <TextField
                value={password}
                required
                onChange={(e) => setPassWord(e.target.value)}
                id="outlined-password-input"
                label="Password"
                type="password"
                variant="outlined"
            />
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button> 
        </form>
    )
}

export default SignUpForm;