import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../../Notification';
//import recipeService from '../../services.js' 


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassWord] = useState('')
    const [user, setUser] = useState(null)
    const showError = useRef(false)


    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassWord(event.target.value);
    };

    /* //simple login check for later authentication and stuff
     const checkLogin = async (event) => {   
        event.preventDefault()
        try {      
          const user = await recipeService.login({ username, password })
          recipeService.setToken(user.token)   
          window.localStorage.setItem(        
            'loggedNoteappUser', JSON.stringify(user)      
            ) 
            setUser(user)    
            setUsername('')      
            setPassWord('')    
          } 
          catch (exception) {   
            setTimeout(() => {          
          }, 5000)    
          }
          setPassWord("")
          setUsername("")
      }**/

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
            <Button variant="contained" color="primary" >
                Login
            </Button> 
            <p>Forgot <a href="">password?</a></p>
        </div>
    );
  }
  
export default LoginForm;
  