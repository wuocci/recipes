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
            <div className="appbar">
                <AppBar position="static">
                    <Toolbar>
                        <div className="appbar-logo">
                            <Link to="/">
                                <img src={logo} alt="logo of the brand"></img>
                            </Link>
                        </div>
                        <div className="appbar-buttons">
                            <Link to="/login">
                                <LogInButton />
                            </Link>
                            <Link to="/sign-up">
                                <SignUpButton />
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default ButtonAppBar;