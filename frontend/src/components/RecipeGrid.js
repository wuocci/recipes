import React, { useEffect, useState, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import RecipeDialog from "./RecipeDialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";
import recipeimg from "../img/pesto.jpg";
import recipeservice from "../services/recipeservice";
import authservice from "../services/authservice";
import userservice from "../services/userservice";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";

export default function RecipeGrid() {
  const [recipes, setRecipes] = useState([]);
  const [openDialog, setDialog] = useState(false);
  const [clickedRecipe, setClickedRecipe] = useState();
  const [userFavourites, setFavourites] = useState([]);
  const [user, setUser] = useState(authservice.getCurrentUser());
  const [fav, setFav] = useState(false);

  const openRecipe = (item) => {
    setDialog(true);
    setClickedRecipe(item);
  };

  const toggleModal = (val) => setDialog(val);

  //fetch recipes from mongodb
  useEffect(() => {
    recipeservice
      .getAll()
      .then((data) => setRecipes(data))
      .catch((error) => {
        throw error;
      });
  }, [openDialog]);

  useEffect(() => {
    setUser(authservice.getCurrentUser());
    if (user === null) {
      setFavourites([]);
    } else {
      console.log(user);
      if (user.favourites === undefined || user.favourites === null) {
        setFavourites([]);
      }
      setFavourites(user.favourites);
    }
  }, [fav, openDialog, recipes]);

  const favouriteHandler = (item) => {
    const profile = JSON.parse(localStorage.getItem("user"));
    console.log(profile);
    if (profile.favourites.includes(item._id)) {
      const index = profile.favourites.indexOf(item._id);
      profile.favourites.splice(index);
      localStorage.setItem("user", JSON.stringify(profile));
      userservice.deleteFavourite(user.id, item);
    } else {
      profile.favourites.push(item._id);
      localStorage.setItem("user", JSON.stringify(profile));
      userservice.addFavourite(user.id, item);
    }
    setUser(JSON.parse(localStorage.getItem("user")));
    setFav(!fav);
  };

  //add loader until recipes are fetched
  if (recipes === null) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else if (openDialog === true) {
    return (
      <RecipeDialog
        openDialog={openDialog}
        clickedRecipe={clickedRecipe}
        toggleModal={toggleModal}
        userFavourites={userFavourites}
        setFavourites={setFavourites}
        recipes={recipes}
      ></RecipeDialog>
    );
  } else {
    return (
      <div className="recipe-grid">
        <Grid container spacing={5}>
          {recipes.map((item) => (
            <Grid item xs={2} key={item._id}>
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
                  {user !== null ? (
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => favouriteHandler(item)}
                    >
                      {userFavourites.includes(item._id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  ) : (
                    <Tooltip title="You log in to add favourite recipes.">
                      <span>
                        <IconButton disabled aria-label="add to favorites">
                          <FavoriteBorderIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
