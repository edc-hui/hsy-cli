import React from "react";
import {Route, Switch} from 'react-router-dom';
import BasicLayouts from "../layouts/BasicLayouts/BasicLayouts";
import Home from "../pages/Home/Home";

const BasicRoutesPath = '/basic';
const BasicRoutes = () => {
    return (
        <BasicLayouts>
            <Switch>
                <Route exact path={BasicRoutesPath} component={Home}/>
                <Route path={`${BasicRoutesPath}/home`} component={Home}/>
            </Switch>
        </BasicLayouts>
    )
}

export default BasicRoutes;