import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../img/logoRecipeBox.svg'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import successImg from '../../img/success.svg';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import recipeImg from '../../img/recipebox_img1.svg';


const SuccessfulRegistration = () => {
    const location = useLocation()
    console.log(location.state)
    return (
        <div className="success-register">
            <div className="success-register-image">
                <img src={logo} className="recipe-logo" alt="logo of the brand"></img>
                <img src={recipeImg} className="recipe-img" alt="human picking up recipe items to list" ></img>
            </div>
            <div className="success-register-content">
                <Typography variant="h4" component="h1">Registered <strong>successfully!</strong></Typography>
                <Typography variant="body1" component="p"> Welcome, <strong>{location.state.user}</strong> </Typography>
                <Typography variant="body2" component="p">Thank you for registering, enjoy!</Typography>
                <img src={successImg} alt="success icon"></img>

                <div className="success-register-buttons">
                    <Link to="/login">
                        <Button variant="contained" color="primary" size="large">Login</Button>
                    </Link>
                    <Link to="/">
                        <Button variant="outlined" color="primary" size="large">Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SuccessfulRegistration;