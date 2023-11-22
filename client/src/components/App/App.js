import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Dropdown from '../Dropdown/Dropdown';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import ChangePassword from '../ChangePassword/ChangePassword';
import FoundMicrowave from '../FoundMicrowave/FoundMicrowave';
import Reviews from '../Reviews/Reviews';

import TestReviews from '../TestReviews/TestReviews';
import NewReview from '../NewReview/NewReview';


function App() {
    const [token, setToken] = useState();

    return (
        <div className="wrapper">
            <h1>Welcome to Knightrowave!</h1>
            <Router>
                <Switch>                 
                    <Route exact path="/">
                        <Redirect to="/login"/>
                    </Route>
                    <Route path="/test-reviews">
                        <TestReviews/>
                    </Route>    
                    <Route path="/new-review">
                        <NewReview/>
                    </Route>                                              
                    <Route path="/dashboard">
                        <Dashboard/>
                        <Dropdown/>
                    </Route>
                    <Route path="/profile-settings">
                        <ProfileSettings/>
                        <Dropdown/>
                    </Route>
                    <Route path="/change-password">
                        <ChangePassword/>
                        <Dropdown/>
                    </Route>
                    <Route path="/my-reviews">
                        <Reviews/>
                        <Dropdown/>
                    </Route>
                    <Route path="/found-microwave">
                        <FoundMicrowave/>
                        <Dropdown/>
                    </Route>
                    <Route path="/login">
                        <Login setToken={setToken}/>
                    </Route>
                    <Route path="/register">
                        <Register setToken={setToken}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
