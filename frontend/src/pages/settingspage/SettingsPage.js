import React from "react";
import ButtonAppBar from "../../components/appBar/ButtonAppBar.js";
import Settings from "./Settings.js";

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <ButtonAppBar />
      <Settings />
    </div>
  );
};

export default SettingsPage;
