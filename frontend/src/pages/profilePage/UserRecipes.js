import React, { useState } from "react";
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

const UserRecipes = ({ userRecipes }) => {
  console.log(userRecipes);
  const [openDialog, setDialog] = useState(false);
  const openRecipe = () => {
    setDialog(true);
  };

  const toggleModal = (val) => setDialog(val);

  return (
    <div className="user-recipes-grid">
      <Grid container spacing={5}>
        {userRecipes.map((item) => (
          <Grid item xs={(2, 3)}>
            <Card className="recipe-card">
              <CardActionArea onClick={openRecipe}>
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
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserRecipes;
