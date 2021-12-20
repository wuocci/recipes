import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";
import recipeimg from "../../img/pesto.jpg";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import RecipeDialog from "../../components/RecipeDialog";
import userservice from "../../services/userservice";
import authservice from "../../services/authservice";
import recipeservice from "../../services/recipeservice";

const FavouriteRecipes = ({ setFavouriteFlag, favouriteFlag }) => {
  const [profile, setProfile] = useState(authservice.getCurrentUser());
  const [openDialog, setDialog] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [clickedRecipe, setClickedRecipe] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProfile(authservice.getCurrentUser());
    setFavourites([]);
    if (profile !== undefined) {
      if (profile.favourites.length === 0) {
        setFavourites([]);
      }
    }
  }, [favouriteFlag, openDialog]);

  setTimeout(() => {
    console.log(favourites);
    setLoading(false);
  }, 100);

  const openRecipe = (item) => {
    setClickedRecipe(item);
    setDialog(true);
  };

  const favouriteHandler = (item) => {
    const index = profile.favourites.findIndex(
      (recipe) => recipe._id === item._id
    );
    console.log(index);
    profile.favourites.splice(index, 1);
    localStorage.setItem("user", JSON.stringify(profile));
    userservice.deleteFavourite(profile.id, item);
    setFavouriteFlag(!favouriteFlag);
  };

  const toggleModal = (val) => setDialog(val);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className="user-recipes-grid">
        {profile.favourites.length === 0 && (
          <div> No favourites added yet </div>
        )}
        {openDialog ? (
          <RecipeDialog
            openDialog={openDialog}
            clickedRecipe={clickedRecipe}
            toggleModal={toggleModal}
            userFavourites={favourites}
            setFavourites={setFavourites}
          ></RecipeDialog>
        ) : (
          <Grid container spacing={5}>
            {profile.favourites.map((item) => (
              <Grid item xs={2}>
                <Card className="recipe-card">
                  <CardActionArea onClick={() => openRecipe(item)}>
                    <CardMedia
                      component="img"
                      alt="Picture of the recipe"
                      height="120"
                      image={recipeimg}
                    />
                    <CardHeader
                      title={item.title}
                      subheader={" by " + item.user[0].username}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="remove from favorites"
                      onClick={() => favouriteHandler(item)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    );
  }
};
export default FavouriteRecipes;
