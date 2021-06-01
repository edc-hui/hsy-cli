import React from "react";
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Login from "../pages/Login/Login";
import BasicRoutes from "./BasicRoutes";

const AppRoute = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/basic" component={BasicRoutes}/>
            </Switch>
        </Router>
    )
}

export default AppRoute;