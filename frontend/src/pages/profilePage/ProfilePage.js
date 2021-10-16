import ButtonAppBar from "../../components/appBar/ButtonAppBar.js";
import ProfileInfo from "./ProfileInfo.js";
import authService from "../../services/authservice";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
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
