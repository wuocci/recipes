import './css/App.css';
import React, {useState, useEffect, useRef} from 'react';
import FrontPage from './pages/frontPage/FrontPage.js';
import LoginPage from './pages/logInPage/LoginPage.js';
import SignUpPage from './pages/signUpPage/SignUpPage.js';
import authService from './services/authservice' 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const user = useRef(null)
  const [recipes, setRecipes] = useState([])



  //get user data when page renders
  useEffect(() => {    
    const loggedUserJSON = authService.getCurrentUser();
    user.current = loggedUserJSON
    console.log(loggedUserJSON)
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
