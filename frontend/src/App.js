import './css/App.css';
import React, {useState, useEffect, useRef} from 'react';
import FrontPage from './pages/frontPage/FrontPage.js';
import LoginPage from './pages/logInPage/LoginPage.js';
import SignUpPage from './pages/signUpPage/SignUpPage.js';
import authService from './services/authservice' 
import SuccessfulRegistration from './pages/signUpPage/SuccessfulRegistration';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProfilePage from './pages/profilePage/ProfilePage';

const App = () => {
  const user = useRef(null)
  const [recipes, setRecipes] = useState([])



  //get user data when page renders
  useEffect(() => {    
    user.current = authService.getCurrentUser();
  }, 
  [])

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <FrontPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/sign-up">
            <SignUpPage />
          </Route>
          <Route path="/success" exact component = {SuccessfulRegistration} />
          <Route path="/:userId" exact component = {ProfilePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
