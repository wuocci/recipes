import React, { useRef, useState, } from 'react';
import logo from '../../img/logoRecipeBox.svg'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../../Notification'
import { Typography } from '@material-ui/core';
import authService from '../../services/authservice'
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const SignUpForm = () => {
    const [showNotification, setNotification] = useState(false)
    const [errorMessage, setMessage] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false);
    const history = useHistory();

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
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            history.push({
                pathname: '/success',
                state: { user: data.username }})
        }, 3000);
            authService.register(data.username, data.email, data.password).then(
                (response) => {
                    setMessage(response.data.message);
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
        <div>
            <div className="sign-up-page-header">
                <Link to="/">
                    <img src={logo} alt="logo of the brand"></img>
                </Link>
            </div>
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
                {loading && 
                <div className="sign-up-loader">
                    <CircularProgress color="success"/>
                    <Typography variant="subtitle1" component="p"
                    >Registering...
                    </Typography>
                </div>
                }
                <Button variant="contained" color="primary" onClick={handleSubmit(submitSignUp)}>
                    Submit
                </Button> 
            </div>
        </div>
        )
}

export default SignUpForm;