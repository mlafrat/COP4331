import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';

function App() {
    const [token, setToken] = useState();

    return (
        <div className="wrapper">
            <h1>Application</h1>
            <Router>
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/preferences">
                        <Preferences />
                    </Route>
                    <Route path="/">
                        <Login setToken={setToken} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
