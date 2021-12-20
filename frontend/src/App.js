import "./css/App.css";
import React, { useEffect, useRef } from "react";
import FrontPage from "./pages/frontPage/FrontPage.js";
import LoginPage from "./pages/logInPage/LoginPage.js";
import SignUpPage from "./pages/signUpPage/SignUpPage.js";
import SuccessfulRegistration from "./pages/signUpPage/SuccessfulRegistration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/profilePage/ProfilePage";
import SettingsPage from "./pages/settingspage/SettingsPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/success" element={<SuccessfulRegistration />} />
          <Route path="/:userId" element={<ProfilePage />} />
          <Route path="/:userId/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
