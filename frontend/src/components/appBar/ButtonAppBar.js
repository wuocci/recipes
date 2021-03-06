import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../img/logoAppbar.svg";
import AuthService from "../../services/authservice";
import AddNewRecipeDialog from "../AddNewRecipeDialog";
import { useHistory } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Identicon from "react-identicons";

import { Link } from "react-router-dom";

const ButtonAppBar = () => {
  const [openDialog, setDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openRecipe = () => {
    setDialog(true);
  };

  const toggleModal = (val) => setDialog(val);

  const isProfilePage = AuthService.getCurrentUser();
  const history = useHistory();

  const handleLogOut = () => {
    AuthService.logout();
    history.push("/");
    window.location.reload();
  };

  const handleProfile = () => {
    history.push("/" + isProfilePage.id);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (openDialog === true) {
    return (
      <div>
        <AddNewRecipeDialog openDialog={openDialog} toggleModal={toggleModal} />
        {/*
                TODO: 
                The appbar in this conditional render is purely for show. As it is in the background while the dialog is open, it's inaccessible, 
                and thus having all this functionality here is just a waste of space. Clean away the functionality, and only leave the app bar's visuals.
                */}
        <div className="appbar">
          <AppBar position="static">
            <Toolbar>
              {isProfilePage === null ? (
                <div className="appbar-container">
                  <div className="appbar-logo">
                    <Link to="/">
                      <img src={logo} alt="logo of the brand"></img>
                    </Link>
                  </div>
                  <Link to="/login" style={{ paddingTop: "20px" }}>
                    <Button variant="outlined">Login</Button>
                  </Link>
                  <Link to="/sign-up" style={{ paddingTop: "20px" }}>
                    <Button variant="contained">Sign Up</Button>
                  </Link>
                </div>
              ) : (
                <div className="appbar-container">
                  <div>
                    <div>
                      <Button
                        className="appbar-button2"
                        style={{ marginTop: "20px" }}
                        color="inherit"
                        onClick={openRecipe}
                      >
                        Add a New Recipe
                      </Button>
                    </div>
                  </div>
                  <div className="appbar-logo">
                    <Link to="/">
                      <img src={logo} alt="logo of the brand"></img>
                    </Link>
                  </div>
                  <Link to="/">
                    <Button
                      className="account-button"
                      style={{ marginTop: "20px" }}
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      Icon={
                        <Identicon
                          string={isProfilePage.username}
                          bg="#000000"
                          size="30"
                        />
                      }
                    >
                      {isProfilePage.username}
                    </Button>
                  </Link>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  } else {
    return (
      <div className="appbar">
        <AppBar position="static">
          <Toolbar>
            {isProfilePage === null ? (
              <div className="appbar-container">
                <div className="appbar-logo" style={{ marginLeft: "45%" }}>
                  <Link to="/">
                    <img src={logo} alt="logo of the brand"></img>
                  </Link>
                </div>
                <Link to="/login" style={{ paddingTop: "20px" }}>
                  <Button className="login-button" variant="outlined">
                    Login
                  </Button>
                </Link>
                <Link to="/sign-up" style={{ paddingTop: "20px" }}>
                  <Button
                    className="signup-button"
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="appbar-container">
                <div>
                  <div>
                    <Button
                      variant="contained"
                      className="add-new-recipe-button"
                      style={{ marginTop: "20px" }}
                      onClick={openRecipe}
                      endIcon={<AddIcon />}
                    >
                      Add a New Recipe
                    </Button>
                  </div>
                </div>
                <div className="appbar-logo">
                  <Link to="/">
                    <img src={logo} alt="logo of the brand"></img>
                  </Link>
                </div>
                <Button
                  className="account-button"
                  style={{ marginTop: "20px" }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  startIcon={
                    <Identicon
                      string={isProfilePage.username}
                      bg="#000000"
                      size="30"
                    />
                  }
                >
                  {isProfilePage.username}
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default ButtonAppBar;
