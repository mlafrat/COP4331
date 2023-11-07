import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Dropdown from '../Dropdown/Dropdown';

function App() {
    const [token, setToken] = useState();

    return (
        <div className="wrapper">
            <h1>Application</h1>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login"/>
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard/>
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
