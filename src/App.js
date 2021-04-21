import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Component } from "react";
import Home from "./Components/Home/Home";
import RegisterScreen from "./Components/Register/RegisterScreen";
import Login from "./Components/Login/Login";
import FeedScreen from "./Components/Feed/FeedScreen";
import Profile from "./Components/Profile/Profile";

class App extends Component{

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/feed">
            <FeedScreen />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;