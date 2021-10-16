import { Typography } from "@material-ui/core";
import Identicon from "react-identicons";
import RecipeGrid from "../../components/RecipeGrid";
import { Divider } from "@material-ui/core";
import { Button } from "@material-ui/core";

const ProfileInfo = ({ userData }) => {
  if (userData != null)
    return (
      <div className="profile">
        <Divider />
        <div className="profile-info">
          <Identicon
            string={userData.username}
            bg="#000000"
            size="90"
            style={{ borderRadius: "10px" }}
          />
          <div className="info">
            <Typography variant="h6" component="h2">
              {userData.username}
            </Typography>
            <Typography variant="body1" component="p">
              Biography
            </Typography>
            <Typography variant="body2" component="p">
              x recipes added
            </Typography>
            <Typography variant="body2" component="p">
              x favourites
            </Typography>
          </div>
          <Button size="small" variant="outlined" color="primary">
            Edit
          </Button>
        </div>
        <Divider />
        <RecipeGrid />
      </div>
    );
  else {
    return <div>loading</div>;
  }
};

export default ProfileInfo;
