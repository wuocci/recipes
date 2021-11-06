import React, { useState, useEffect } from "react";
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
import recipeservice from "../services/recipeservice";
import authservice from "../services/authservice";
import CircularProgress from "@mui/material/CircularProgress";
import Notification from "../Notification";
import userservice from "../services/userservice";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RecipeDialog = ({
  openDialog,
  toggleModal,
  clickedRecipe,
  userFavourites,
  setFavourites,
  recipes,
}) => {
  const [showNotification, setNotification] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserRecipe, setIsUserRecipe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openVerify, setVerify] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [fav, setFav] = useState();

  useEffect(() => {
    setLoading(false);
  }, [openDialog]);

  setTimeout(() => {
    if (user !== null) {
      if (clickedRecipe.user[0].id === user.id) {
        setIsUserRecipe(true);
      }
    }
  }, 50);

  useEffect(() => {
    setUser(authservice.getCurrentUser());
    if (user === null) {
      setFavourites([]);
    } else {
      setFavourites(user.favourites);
    }
  }, [fav, openDialog, recipes]);

  const favouriteHandler = () => {
    const profile = JSON.parse(localStorage.getItem("user"));
    console.log(profile);
    if (profile.favourites.includes(clickedRecipe._id)) {
      const index = profile.favourites.indexOf(clickedRecipe._id);
      profile.favourites.splice(index);
      localStorage.setItem("user", JSON.stringify(profile));
      userservice.deleteFavourite(user.id, clickedRecipe);
    } else {
      profile.favourites.push(clickedRecipe._id);
      localStorage.setItem("user", JSON.stringify(profile));
      userservice.addFavourite(user.id, clickedRecipe);
    }
    setUser(JSON.parse(localStorage.getItem("user")));
    setFav(!fav);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you wish to delete this recipe?"
    );
    if (confirm) {
      setTimeout(() => {
        window.location.reload();
      }, 200);
      recipeservice.deleteRecipe(clickedRecipe);
    }
  };
  if (!loading) {
    return (
      <div>
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
                {isUserRecipe && (
                  <Button
                    onClick={handleDelete}
                    size="small"
                    className="delete-button"
                    variant="contained"
                    startIcon={<DeleteOutlinedIcon />}
                  >
                    Delete
                  </Button>
                )}
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

              <DialogContentText class="recipeInstructions">
                <Typography variant="h5" component="p">
                  Instructions
                </Typography>
                {clickedRecipe.instructions.map((instruction, index) => (
                  <Typography>
                    {index + 1}. {instruction.Instruction}
                  </Typography>
                ))}
              </DialogContentText>

              <DialogContentText class="recipeDescription">
                {clickedRecipe.description}
              </DialogContentText>
              <DialogContentText class="recipeKeywords">
                Keywords: {clickedRecipe.keywords}
              </DialogContentText>

              <DialogContentText class="recipeIngredients">
                <Typography variant="h5">Ingredients</Typography>
                {<br />}
                {clickedRecipe.ingredients.map((ingredient) => (
                  <Typography>
                    {ingredient.Qty} {ingredient.Unit} {ingredient.Ingredient}
                  </Typography>
                ))}
              </DialogContentText>

              <DialogActions class="recipeFavorite">
                {userFavourites.includes(clickedRecipe._id) ? (
                  <Button
                    onClick={() => favouriteHandler()}
                    size="small"
                    className="favourite-button1"
                    variant="contained"
                    startIcon={<FavoriteIcon />}
                  >
                    Remove Favourite
                  </Button>
                ) : (
                  <Button
                    onClick={() => favouriteHandler()}
                    size="small"
                    className="favourite-button2"
                    variant="outlined"
                    startIcon={<FavoriteBorderIcon sx={{ color: "black" }} />}
                  >
                    Add to Favourites
                  </Button>
                )}
              </DialogActions>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
};

export default RecipeDialog;
