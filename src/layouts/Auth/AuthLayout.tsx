import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { routes } from "../../routes/routes.config";
import history from "../../routes/history";

export default function AuthLayout() { 
  return (
    <>
      <div className="bg-light min-vh-100  p-3 p-md-5">
        <Router history={history}>
          <Switch>
            {routes.map((item) => (
              <Route exact key={item.path} path={item.path}>
                <item.component  />
              </Route>
            ))}
          </Switch>
        </Router>
      </div>
    </>
  );
}
