import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import Dropdown from "./components/Dropdown/Dropdown.js";
import ProfileSettings from "./components/ProfileSettings/ProfileSettings.js";
import ChangePassword from "./components/ChangePassword/ChangePassword.js";
import FoundMicrowave from "./components/FoundMicrowave/FoundMicrowave.js";
import Reviews from "./components/Reviews/Reviews.js";
import TestReviews from './components/TestReviews/TestReviews.js';
import NewReview from './components/NewReview/NewReview.js';



function App() {
  const [token, setToken] = useState();

  return (
    <div className="wrapper">
      <div className="rectangle">
        <h1 style={{ color: "white", padding: 12 }}>Knightrowave</h1>
      </div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/test-reviews">
            <TestReviews/>
            <Dropdown />
          </Route>    
          <Route path="/new-review">
              <NewReview/>
              <Dropdown />
          </Route>   
          <Route path="/dashboard">
            <Dashboard />
            <Dropdown />
          </Route>
          <Route path="/profile-settings">
            <ProfileSettings />
            <Dropdown />
          </Route>
          <Route path="/change-password">
            <ChangePassword />
            <Dropdown />
          </Route>
          <Route path="/my-reviews">
            <Reviews />
            <Dropdown />
          </Route>
          <Route path="/found-microwave">
            <FoundMicrowave />
            <Dropdown />
          </Route>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/register">
            <Register setToken={setToken} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

/*
      <Router>
        <Switch>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/test-reviews" element={<TestReviews/>}></Route>
            <Route path="/new-review" element={<NewReview/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/profile-settings" element={<ProfileSettings/>}></Route>
            <Route path="/change-password" element={<ChangePassword/>}></Route>
            <Route path="/my-reviews" element={<Reviews/>}></Route>
            <Route path="/found-microwave" element={<FoundMicrowave/>}></Route>
            <Route path="/login" element={<Login setToken={setToken}/>}></Route>
            <Route path="/register" element={<Register setToken={setToken}/>}></Route>
        </Switch>
      </Router>


      
*/