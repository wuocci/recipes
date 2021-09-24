import React, { useEffect, useState, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../img/logoAppbar.svg';
import LogInButton from './LogInButton';
import AuthService from '../../services/authservice'
import SignUpButton from './SignUpButton';
import RecipeDialog from '../RecipeDialog';
import { useHistory } from "react-router-dom";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const ButtonAppBar = () => {
    const [openDialog, setDialog] = useState(false)

    const openRecipe = () => {
        setDialog(true)
    }

    const toggleModal = (val) => setDialog(val)

    const isProfilePage = AuthService.getCurrentUser();
    const history = useHistory();

    const handleLogOut = () => {
        AuthService.logout();
        history.push("/");
        window.location.reload();
    }
    console.log(isProfilePage)
    if (openDialog === true) {
        return (
            <div>
                <RecipeDialog openDialog={openDialog} toggleModal={toggleModal}/>
                <div className="appbar">
                <AppBar position="static">
                    <Toolbar>

                        {isProfilePage === null ?
                            <div className="appbar-container">
                                <div className="appbar-logo" style={{ marginLeft: "45%" }}>
                                    <Link to="/">
                                        <img src={logo} alt="logo of the brand"></img>
                                    </Link>
                                </div>
                                <Link to="/login" style={{ paddingTop: "20px" }}>
                                    <LogInButton />
                                </Link>
                                <Link to="/sign-up" style={{ paddingTop: "20px" }}>
                                    <SignUpButton />
                                </Link>
                            </div>
                            :
                            <div className="appbar-container">
                                <div>
                                    <div>
                                        <Button className="appbar-button2" style={{ padding: "30px" }} color="inherit" onClick={openRecipe}>Add a New Recipe</Button>
                                    </div>
                                </div>
                                <div className="appbar-logo">
                                    <Link to="/">
                                        <img src={logo} alt="logo of the brand"></img>
                                    </Link>
                                </div>
                                <Link to="/">
                                    <Button className="appbar-button1" style={{ padding: "30px" }} color="inherit" onClick={handleLogOut}>Logout</Button>
                                </Link>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
            </div>
            
            )
    } else {
        return (
            <div className="appbar">
                <AppBar position="static">
                    <Toolbar>

                        {isProfilePage === null ?
                            <div className="appbar-container">
                                <div className="appbar-logo" style={{ marginLeft: "45%" }}>
                                    <Link to="/">
                                        <img src={logo} alt="logo of the brand"></img>
                                    </Link>
                                </div>
                                <Link to="/login" style={{ paddingTop: "20px" }}>
                                    <LogInButton />
                                </Link>
                                <Link to="/sign-up" style={{ paddingTop: "20px" }}>
                                    <SignUpButton />
                                </Link>
                            </div>
                            :
                            <div className="appbar-container">
                                <div>
                                    <div>
                                        <Button className="appbar-button2" style={{ padding: "30px" }} color="inherit" onClick={openRecipe}>Add a New Recipe</Button>
                                    </div>
                                </div>
                                <div className="appbar-logo">
                                    <Link to="/">
                                        <img src={logo} alt="logo of the brand"></img>
                                    </Link>
                                </div>
                                <Link to="/">
                                    <Button className="appbar-button1" style={{ padding: "30px" }} color="inherit" onClick={handleLogOut}>Logout</Button>
                                </Link>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default ButtonAppBar;