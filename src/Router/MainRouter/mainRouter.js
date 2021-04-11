import React from "react";
import { Route, Switch } from "react-router-dom";

import Crud from "../../Components/Crud";
import Completed from "../../Components/Completed";
import NavBar from "../../Common/NavBar/navBar";

const MainRouter = () => (
    <>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Crud}></Route>
            <Route exact path="/crud" component={Crud}></Route>
            <Route exact path="/completed" component={Completed}></Route>
        </Switch>
    </>
);

export default MainRouter;
