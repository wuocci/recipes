import ButtonAppBar from "../../components/appBar/ButtonAppBar.js";

import { Divider } from "@material-ui/core";
import ProfileInfo from "./ProfileInfo.js";
import authService from "../../services/authservice";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(authService.getCurrentUser());
    console.log(userData);
  }, [userData]);
  return (
    <div className="ProfilePage">
      <ButtonAppBar />
      <Divider />
      <ProfileInfo userData={userData} />
    </div>
  );
};

export default ProfilePage;
