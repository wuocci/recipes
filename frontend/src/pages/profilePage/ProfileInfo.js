import { Typography } from "@material-ui/core";
import Identicon from "react-identicons";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from "@material-ui/core";
import { Button } from "@material-ui/core";
import recipeservice from "../../services/recipeservice";
import authService from "../../services/authservice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TabPanel from "./TabPanel";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [favouriteFlag, setFavouriteFlag] = useState(false);
  const [userData, setUserData] = useState();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    //extract path id
    setUserData(authService.getCurrentUser());
    const pathWithSlash = location.pathname;
    const id = pathWithSlash.slice(1);
    recipeservice
      .getRecipesByUser(id)
      .then((data) => setUserRecipes(data))
      .catch((error) => {
        throw error;
      });
  }, [favouriteFlag]);

  setTimeout(() => {
    setLoading(false);
  }, 100);

  const handleSettings = () => {
    navigate("/" + userData.id + "/settings");
  };

  if (!loading && userData !== undefined) {
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
              {userData.favourites.length} favourites
            </Typography>
          </div>
          <Button
            onClick={handleSettings}
            size="small"
            variant="outlined"
            color="primary"
          >
            Edit profile
          </Button>
        </div>
        <Divider />
        <TabPanel
          userData={userData}
          favouriteFlag={favouriteFlag}
          setFavouriteFlag={setFavouriteFlag}
        />
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
