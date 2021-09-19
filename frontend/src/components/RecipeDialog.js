import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';


const RecipeDialog = ({openDialog, toggleModal}) => {
  console.log(openDialog)
  return (
    <div>
      <Dialog
        open={openDialog}
        /*
        Would need to be modified to detect if click occured in our out of the actual dialog.
        I don't think it's necessary to have this alternate way of closing the dialog anyway.
        
        onClick={() => toggleModal(false)}
        */
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="recipe-dialog"
      >
        
          <DialogContent class="recipeDialogContent">
          <div class="recipeContainer">
            <DialogTitle class="recipeTitle" id="alert-dialog-title">{"Recipe name by user user"}
              <IconButton onClick={() => toggleModal(false)} color="primary">
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContentText class="recipeSlides">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>

            <DialogContentText class="recipeSpecs">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>

            <DialogContentText class="recipeInstructions">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>

            <DialogContentText class="recipeIngredients">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>

            <DialogActions class="recipeFavorite" >
              <Button color="primary" autoFocus>
                Add favourite
              </Button>
            </DialogActions>
            </div>
          </DialogContent>

      </Dialog>
    </div>
  );
}

export default RecipeDialog;