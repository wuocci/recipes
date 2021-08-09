import './css/App.css';
import React, {useState, useEffect} from 'react';
import FrontPage from './pages/frontPage/FrontPage.js';
import LoginPage from './pages/logInPage/LoginPage.js';
import SignUpPage from './pages/signUpPage/SignUpPage.js';
import recipeService from './services.js' 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null)
  const [recipes, setRecipes] = useState([])


  //get all recipes from database
  useEffect(() => {
    recipeService.getAll().then(recipes =>
      setRecipes(recipes)
    )
  }, [])


  //get user data when page renders
  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedRecipeAppUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      recipeService.setToken(user.token)    
    }  
  }, 
  [])



  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <FrontPage />
          </Route>
          <Route path="/LoginPage">
            <LoginPage />
          </Route>
          <Route path="/SignUpPage">
            <SignUpPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
