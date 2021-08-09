import './css/App.css';
import FrontPage from './pages/frontPage/FrontPage.js';
import LoginPage from './pages/logInPage/LoginPage.js';
import SignUpPage from './pages/signUpPage/SignUpPage.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
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
