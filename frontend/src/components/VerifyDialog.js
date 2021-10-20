import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import recipeservice from "../services/recipeservice";

const VerifyDialog = ({ openVerify, setVerify, clickedRecipe }) => {
  const handleClose = () => {
    setVerify(false);
  };

  const deleteRecipe = () => {
    recipeservice.deleteRecipe(clickedRecipe);
    window.location.reload();
    setVerify(false);
  };

  return (
    <div>
      <Dialog
        open={openVerify}
        aria-labelledby="alert-dialog"
        aria-describedby="alert-dialog"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteRecipe} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerifyDialog;
