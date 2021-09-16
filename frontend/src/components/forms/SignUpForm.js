import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../../Notification'


const SignUpForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassWord] = useState("")
    const [emailAddress, setEmail] = useState("")
    const showError = useRef(false)
    

    //function for checking sign up data etc. for later usage.
    const submitSignUp = (event) => {
        event.preventDefault()
        if(username === null || password === null){ 
           console.log("invalid")
        }
        else{
            console.log(username)
            console.log(password)
            console.log(emailAddress)
        }
        setUsername("")
        setPassWord("")
        setEmail("")
    }

    return(
        <form className="sign-up-form" onSubmit={submitSignUp}>
            {showError && 
            <Notification 
                showError={showError}
                errorMessage={"Invalid username or password"}
                type="error"
            /> 
            }  
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