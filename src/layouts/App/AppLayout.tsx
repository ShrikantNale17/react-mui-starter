import React, { useEffect, useState } from "react";
import { Router, Switch } from "react-router-dom";
import { routes } from "../../routes/routes.config";
import history from "../../routes/history";
import Routes from "../../routes/routes";
import { Navbar } from "../../components/navbar";
import { authenticationService } from "../../utils/auth.service";

export default function AppLayout(props: any) {
  return (
    <>
      <Navbar
        onLogout={() => {
          authenticationService.localLogout();
        }}
      />
      <Router history={history}>
        <Switch>
          {routes.map((item) => {
            console.log("Navbar")
            return (
              <Routes
                exact
                component={item.component}
                key={item.path}
                path={item.path}
              />
            );
          })}
        </Switch>
      </Router>
    </>
  );
}
