import { Typography } from "@material-ui/core";
import Identicon from "react-identicons";
import IconButton from "@material-ui/core/IconButton";
import RecipeDialog from "../../components/RecipeDialog";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
import recipeimg from "../../img/pesto.jpg";
import { Divider } from "@material-ui/core";
import { Button } from "@material-ui/core";
import recipeservice from "../../services/recipeservice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProfileInfo = ({ userData }) => {
  const [userRecipes, setUserRecipes] = useState([]);
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

  const openRecipe = () => {
    setDialog(true);
  };

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const toggleModal = (val) => setDialog(val);

  if (!loading && userData !== null) {
    return (
      <div className="profile">
        <Divider />
        <div className="profile-info">
          <Identicon string={userData.username} bg="#000000" size="90" />
          <div className="info">
            <Typography variant="h6" component="h2">
              {userData.username}
            </Typography>
            <Typography variant="body1" component="p">
              Biography
            </Typography>
            <Typography variant="body2" component="p">
              {userRecipes.length} recipes added
            </Typography>
            <Typography variant="body2" component="p">
              x favourites
            </Typography>
          </div>
          <Button size="small" variant="outlined" color="primary">
            Edit profile
          </Button>
        </div>
        <Divider />
        <div className="user-recipe-grid">
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
                      subheader={" by " + item.author}
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

export default ProfileInfo;
