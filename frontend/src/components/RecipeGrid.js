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
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";
import recipeimg from "../img/pesto.jpg";
import recipeservice from "../services/recipeservice";

export default function RecipeGrid() {
  const [recipes, setRecipes] = useState(null);
  const [openDialog, setDialog] = useState(false);
  const [clickedRecipe, setClickedRecipe] = useState();

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
  }, []);

  //add loader until recipes are fetched
  if (recipes === null) {
    return <div>loading</div>;
  } else if (openDialog === true) {
    return (
      <RecipeDialog
        openDialog={openDialog}
        clickedRecipe={clickedRecipe}
        toggleModal={toggleModal}
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
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
