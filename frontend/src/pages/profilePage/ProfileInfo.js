import { Typography } from "@material-ui/core";
import Identicon from "react-identicons";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from "@material-ui/core";
import { Button } from "@material-ui/core";
import recipeservice from "../../services/recipeservice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TabPanel from "./TabPanel";
import { useHistory } from "react-router";

const ProfileInfo = ({ userData }) => {
  const [userRecipes, setUserRecipes] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
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

  const handleSettings = () => {
    history.push("/" + userData.id + "/settings");
  };

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
        <TabPanel userRecipes={userRecipes} />
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
