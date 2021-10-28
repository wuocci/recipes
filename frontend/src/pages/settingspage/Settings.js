import React, { useEffect, useState } from "react";
import authService from "../../services/authservice";
import Identicon from "react-identicons";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import Notification from "../../Notification";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [showNotification, setNotification] = useState(false);
  const [errorMessage, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // schema for form data
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .max(30, "Username must not exceed 30 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    //acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //function for checking sign up
  const submitSignUp = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    /*authService.register(data.username, data.email, data.password).then(
      (response) => {
        setMessage(response.data.message);
      },
      (error) => {
        setNotification(true);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );*/
  };

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);
  console.log(user);

  if (user !== null) {
    return (
      <div className="settings">
        <div className="settings-info">
          <Identicon string={user.username} bg="#000000" size="90" />
        </div>
        <div>
          {showNotification && (
            <Notification
              showNotification={showNotification}
              setNotification={setNotification}
              errorMessage={errorMessage}
              type="error"
            />
          )}
        </div>
        <h1>Edit profile</h1>
        <TextField
          id="standard-email"
          variant="outlined"
          defaultValue={user.email}
          {...register("email")}
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
          {...register("username")}
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
          {...register("password")}
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
          {...register("confirmPassword")}
          error={errors.confirmPassword ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.confirmPassword?.message}
        </Typography>
        {loading && (
          <div className="sign-up-loader">
            <CircularProgress color="success" />
            <Typography variant="subtitle1" component="p">
              Registering...
            </Typography>
          </div>
        )}
        <LoadingButton
          variant="contained"
          loadingIndicator="Loading..."
          loading={loading}
          color="primary"
          onClick={handleSubmit(submitSignUp)}
        >
          Submit
        </LoadingButton>
      </div>
    );
  } else {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
};

export default Settings;
