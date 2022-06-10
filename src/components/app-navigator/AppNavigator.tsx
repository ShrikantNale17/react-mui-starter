import React from "react";
import Routes from "../../routes/routes";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { paths, routes, } from "../../routes/routes.config";
import history from "../../routes/history";
import AuthLayout from "../../layouts/Auth/AuthLayout";
import AppLayout from "../../layouts/App/AppLayout";
import PageNotFound from "../../pages/auth/page-not-found/page-not-found";
import "./AppNavigator.scss";
import { authenticationService } from "../../utils/auth.service";

export type AppNavigatorProps = any;
type my = {



}

export const AppNavigator = (props: AppNavigatorProps) => {


  return (
    <Router history={history}>
      <Switch>
        <Redirect key="default" exact from="/" to={paths.home}></Redirect>

        {routes.map((item, index) => {
          if (item.path.includes("auth/")) {
            if (
              authenticationService.currentUserValue &&
              !authenticationService.currentUserValue._pre
            ) {
              return (
                <Redirect
                  exact
                  key={index} //if "auth" is present and  "authenticationService.currentUserValue._pre" NOT preset then it redirect to home
                  from={item.path} //==>  "/auth/login", if includes "auth" then
                  to={paths.home} // ==>  "/home"
                ></Redirect>
              );
            } else {
              return (
                <Route
                  exact // <Routes path={"/auth/login"} component={Login} >
                  path={item.path} // path: paths.login,  ==>"/auth/login"
                  key={index}
                  component={item.component} // component: Login ; Login = lazy(() => import("../pages/auth/login/login")); going to login page
                >
                  <AuthLayout key={index} />
                </Route>

              );
            }
          } else {
            // if "auth" not present
            return (
              <Routes // <Routes path={"/home"} component={Home} >
                exact
                path={item.path} // path: paths.home, ==>"/home"
                key={index}
                component={item.component} //    component: Home ;  Home = lazy(() => import("../pages/home/home")); i.e. it is going to feed
              >
                <AppLayout key={index} path={item.path} />
              </Routes>
            );
          }
        })}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};
