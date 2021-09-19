import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../img/logoAppbar.svg';
import LogInButton from './LogInButton';
import AuthService from '../../services/authservice'
import SignUpButton from './SignUpButton';
import { useHistory } from "react-router-dom";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const ButtonAppBar = () => {
    const isProfilePage = AuthService.getCurrentUser();
    const history = useHistory();

    const handleLogOut = () => {
        AuthService.logout();
        history.push("/");
        window.location.reload();
    }
    console.log(isProfilePage)
        return (
            <div className="appbar">
                <AppBar position="static">
                    <Toolbar>
                        <div className="appbar-logo">
                            <Link to="/">
                                <img src={logo} alt="logo of the brand"></img>
                            </Link>
                        </div>
                        {isProfilePage === null ? 
                        <div className="appbar-buttons">
                            <Link to="/login">
                                <LogInButton />
                            </Link>
                            <Link to="/sign-up">
                                <SignUpButton />
                            </Link>
                            
                        </div>
                        :
                        <div className="appbar-buttons">
                            <Link to="/">
                                <Button color="inherit" onClick={handleLogOut}>Logout</Button> 
                            </Link>
         
                        </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
}

export default ButtonAppBar;