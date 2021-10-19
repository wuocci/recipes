import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';


const RecipeDialog = ({openDialog, toggleModal, clickedRecipe}) => {
  console.log(openDialog)
  return (
    <div>
      {console.log(clickedRecipe)}
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
            <DialogTitle class="recipeTitle" id="alert-dialog-title">{clickedRecipe.title}
              <IconButton onClick={() => toggleModal(false)} color="primary">
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContentText class="recipeSlides">
              Insert default image or image slideshow here
            </DialogContentText>

            <DialogContentText class="recipeSpecs">
              Main category: {clickedRecipe.main_category}
              {<br/>}
              Main Ingredient: {clickedRecipe.main_ingredient}
              {<br/>}
              Type of Meal: {clickedRecipe.meal_type}
              {<br/>}
            </DialogContentText>
            {
              clickedRecipe.instructions.map((instruction, index) => (
                <DialogContentText class="recipeInstructions">
                  <Typography variant="h5">
                    Instructions
                  </Typography >
                  {index +1}. {instruction.Instruction}
                </DialogContentText>
              ))
            }
            <DialogContentText class="recipeDescription">
              {clickedRecipe.description}
            </DialogContentText>
            <DialogContentText class="recipeKeywords">
              Keywords: {clickedRecipe.keywords}
            </DialogContentText>
              {
                clickedRecipe.ingredients.map((ingredient) => (
                  <DialogContentText class="recipeIngredients">
                    <Typography variant="h5">
                      Ingredients
                    </Typography >
                    {<br/>}
                    <Typography>
                    {ingredient.Qty} {ingredient.Unit} {ingredient.Ingredient}
                    </Typography >
                  </DialogContentText>
                ))
              }

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