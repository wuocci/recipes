import ButtonAppBar from "../../components/appBar/ButtonAppBar.js";
import ProfileInfo from "./ProfileInfo.js";
import authService from "../../services/authservice";
import { useEffect, useState } from "react";
import UserRecipes from "./UserRecipes.js";
import TabPanel from "./TabPanel.js";

const ProfilePage = () => {
  return (
    <div className="ProfilePage">
      <ButtonAppBar />
      <ProfileInfo />
    </div>
  );
};

export default ProfilePage;
