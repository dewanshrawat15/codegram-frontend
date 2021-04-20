import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Component } from "react";
import Home from "./Components/Home/Home";
import RegisterScreen from "./Components/Register/RegisterScreen";
import FeedScreen from "./Components/Feed/FeedScreen";

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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}


function Login(){
  return (
    <div>Login screen</div>
  );
}

export default App;