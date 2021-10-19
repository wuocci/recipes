import ButtonAppBar from "../../components/appBar/ButtonAppBar.js";
import ProfileInfo from "./ProfileInfo.js";
import authService from "../../services/authservice";
import { useEffect, useState } from "react";
import UserRecipes from "./UserRecipes.js";
import TabPanel from "./TabPanel.js";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [favourites, isFavourite] = useState(false);

  useEffect(() => {
    setUserData(authService.getCurrentUser());
  }, []);

  return (
    <div className="ProfilePage">
      <ButtonAppBar />
      <ProfileInfo userData={userData} />
    </div>
  );
};

export default ProfilePage;
