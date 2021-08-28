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

export default function RecipeDialog({openDialog, toggleModal}){
  console.log(openDialog)
    

  return (
    <div>
      <Dialog
        open={openDialog}
        onClick={() => toggleModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="recipe-dialog"
      >
        <DialogTitle id="alert-dialog-title">{"Recipe name by user user"}
        <IconButton onClick={() => toggleModal(false)} color="primary">
            <Close/>
          </IconButton>
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText id="recipe">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" autoFocus>
            Add favourite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}