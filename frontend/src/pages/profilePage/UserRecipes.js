import React, { useState, useEffect } from "react";
import RecipeDialog from "../../components/RecipeDialog";
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
import recipeservice from "../../services/recipeservice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const UserRecipes = ({ userData, favourites, setFavourites }) => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [clickedRecipe, setClickedRecipe] = useState();
  const [openDialog, setDialog] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    //extract path id
    const pathWithSlash = location.pathname;
    const id = pathWithSlash.slice(1);
    recipeservice
      .getRecipesByUser(id)
      .then((data) => setUserRecipes(data))
      .catch((error) => {
        throw error;
      });
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const openRecipe = (item) => {
    setClickedRecipe(item);
    setDialog(true);
  };

  const toggleModal = (val) => setDialog(val);

  if (!loading) {
    return (
      <div className="user-recipes-grid">
        {openDialog && (
          <RecipeDialog
            openDialog={openDialog}
            clickedRecipe={clickedRecipe}
            toggleModal={toggleModal}
            userFavourites={favourites}
            setFavourites={setFavourites}
          ></RecipeDialog>
        )}
        <Grid container spacing={5}>
          {userRecipes.length === 0 && (
            <Typography variant="body1"> No recipes added yet! </Typography>
          )}
          {userRecipes.map((item) => (
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
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      {favourites.includes(item._id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
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

export default UserRecipes;
