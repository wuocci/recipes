import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../img/logoAppbar.svg';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const ButtonAppBar = (props) => {
    const isProfilePage = props.isProfilePage;
    if (!isProfilePage) {
        return (
            <div className="AppBar">
                <AppBar position="static">
                    <Toolbar>
                        <img src={logo} alt="logo of the brand"></img>
                        <Link to="/LoginPage">
                            <LogInButton />
                        </Link>
                        <Link to="/SignUpPage">
                            <SignUpButton />
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default ButtonAppBar;