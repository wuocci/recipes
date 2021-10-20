import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import VerifyDialog from "./VerifyDialog";

const RecipeDialog = ({ openDialog, toggleModal, clickedRecipe }) => {
  const [openVerify, setVerify] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDelete = () => {
    setVerify(true);
  };

  return (
    <div>
      {console.log(clickedRecipe)}
      <Dialog
        fullScreen={fullScreen}
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
        {openVerify && (
          <VerifyDialog
            openVerify={openVerify}
            setVerify={setVerify}
            clickedRecipe={clickedRecipe}
          />
        )}
        <DialogContent class="recipeDialogContent">
          <div class="recipeContainer">
            <DialogTitle className="recipeTitle" id="alert-dialog-title">
              {clickedRecipe.title}
              <IconButton onClick={() => toggleModal(false)} color="primary">
                <Close />
              </IconButton>
              <Button
                onClick={handleDelete}
                size="small"
                className="delete-button"
                variant="contained"
                startIcon={<DeleteOutlinedIcon />}
              >
                Delete
              </Button>
            </DialogTitle>

            <DialogContentText class="recipeSlides">
              Insert default image or image slideshow here
            </DialogContentText>

            <DialogContentText class="recipeSpecs">
              Main category: {clickedRecipe.main_category}
              {<br />}
              Main Ingredient: {clickedRecipe.main_ingredient}
              {<br />}
              Type of Meal: {clickedRecipe.meal_type}
              {<br />}
            </DialogContentText>
            {clickedRecipe.instructions.map((instruction, index) => (
              <DialogContentText class="recipeInstructions">
                <Typography variant="h5" component="p">
                  Instructions
                </Typography>
                {index + 1}. {instruction.Instruction}
              </DialogContentText>
            ))}
            <DialogContentText class="recipeDescription">
              {clickedRecipe.description}
            </DialogContentText>
            <DialogContentText class="recipeKeywords">
              Keywords: {clickedRecipe.keywords}
            </DialogContentText>
            {clickedRecipe.ingredients.map((ingredient) => (
              <DialogContentText class="recipeIngredients">
                <Typography variant="h5">Ingredients</Typography>
                {<br />}
                <Typography>
                  {ingredient.Qty} {ingredient.Unit} {ingredient.Ingredient}
                </Typography>
              </DialogContentText>
            ))}

            <DialogActions class="recipeFavorite">
              <Button
                size="small"
                className="favourite-button"
                variant="outlined"
                startIcon={<FavoriteBorderIcon sx={{ color: "orange" }} />}
              >
                Add favourite
              </Button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeDialog;
