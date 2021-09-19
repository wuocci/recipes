import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../../Notification'
import { Typography } from '@material-ui/core';
import authService from '../../services/authservice'
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SignUpForm = () => {
    const [showNotification, setNotification] = useState(false)
    const [errorMessage, setMessage] = useState("")
    const history = useHistory()

    // schema for form data
    const validationSchema = Yup.object().shape({
        username: Yup.string()
          .required('Username is required')
          .max(30, 'Username must not exceed 30 characters'),
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        //acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
      });

      const {
        register,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });
    

    //function for checking sign up
    const submitSignUp = (data) => {
            authService.register(data.username, data.email, data.password).then(
                (response) => {
                  setMessage(response.data.message);
                 // history.push("/login");
                  //window.location.reload();
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
    }

    return(
       <div className="sign-up-form">
            <div>
            {showNotification &&
            <Notification 
                showNotification={showNotification}
                setNotification={setNotification}
                errorMessage={errorMessage}
                type="error"
            />
            }  
            </div>
            <h1>Create Account</h1>
            <TextField
                required
                //onChange={(e) => setEmail(e.target.value)}
                id="standard-email"
                label="Email"
                variant="outlined"
                {...register('email')}
                error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            <TextField
                required
                id="standard-username"
                label="Username"
                variant="outlined"
                {...register('username')}
                error={errors.username ? true : false}
            />
             <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
              </Typography>
            <TextField
                required
                //onChange={(e) => setPassWord(e.target.value)}
                id="outlined-password-input"
                label="Password"
                type="password"
                variant="outlined"
                {...register('password')}
                error={errors.password ? true : false}
            />
             <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                {...register('confirmPassword')}
                error={errors.confirmPassword ? true : false}
              />
            <Typography variant="inherit" color="textSecondary">
                {errors.confirmPassword?.message}
              </Typography>
        
            <Button variant="contained" color="primary" onClick={handleSubmit(submitSignUp)}>
                Submit
            </Button> 
        </div>
       // </form>
    )
}

export default SignUpForm;