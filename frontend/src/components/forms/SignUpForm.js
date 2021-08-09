import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../../Notification'


const SignUpForm = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassWord] = useState(null)
    const [emailAddress, setEmail] = useState(null)
    const showError = useRef(false)

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassWord(event.target.value);
    };

    const handleEmailAddress = (event) => {
        setEmail(event.target.value);
    }

    //function for checking sign up data etc. for later usage.
    const submitSignUp = () => {
        if(username === null || password === null){ 
           console.log("invalid")
        }
        else{
            console.log(username)
            console.log(password)
            console.log(emailAddress)
        }
    }

    return(
        <div className="sign-up-form">
            {showError && 
            <Notification 
                showError={showError}
                errorMessage={"Invalid username or password"}
                type="error"
            /> 
            }  
            <h1>Create Account</h1>
            <TextField
                required
                onChange={handleEmailAddress}
                id="standard-email"
                label="Email"
                variant="outlined"
            />
            <TextField
                required
                onChange={handleUsername}
                id="standard-username"
                label="Username"
                variant="outlined"
            />
            <TextField
                required
                onChange={handlePassword}
                id="outlined-password-input"
                label="Password"
                type="password"
                variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={submitSignUp}>
                Submit
            </Button> 
        </div>
    )
}

export default SignUpForm;