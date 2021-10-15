import { Typography } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Identicon from "react-identicons";

const ProfileInfo = ({ userData }) => {
  if (userData != null)
    return (
      <div className="profile-info">
        <Identicon
          string={userData.username}
          bg="#000000"
          size="60"
          style={{ borderRadius: "10px" }}
        />
        <Typography variant="h3" component="caption">
          {userData.username}
        </Typography>
      </div>
    );
  else {
    return <div>loading</div>;
  }
};

export default ProfileInfo;
