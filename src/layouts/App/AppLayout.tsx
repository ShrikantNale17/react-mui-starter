import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Router, Switch } from "react-router-dom";
import { routes } from "../../routes/routes.config";
import history from "../../routes/history";
import Routes from "../../routes/routes";
import { Navbar } from "../../components/navbar";
import { authenticationService } from "../../utils/auth.service";

function AppLayout(props: any) {

  const [page, setPage] = useState('home')

  const pageValue = useMemo(() => {
    // history.push(`/${page}`)
    return page
  }, [page])

  /* useEffect(() => {
    history.push(`/${page}`)
  }, [pageValue]) */

  const handlePage = useCallback((value: any) => {
    setPage(value);
    history.push(`/${value}`);
    console.log("page set")
  }, [page])

  return (
    <>
      <Navbar page={pageValue} handlePage={handlePage} />
      <Router history={history}>
        <Switch>
          {routes.map((item) => {
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

export default React.memo(AppLayout);