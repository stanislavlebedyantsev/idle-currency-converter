import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import {
  CHARTS_ROUTE_PATH,
  MAP_ROUTE_PATH,
  CONVERTER_ROUTE_PATH,
} from 'src/constants';
import PrivateRoute from './PrivateRoute';
import ChartsPage from 'src/components/pages/ChartsPage/';
import MapPage from 'src/components/pages/MapPage/';
import ConverterPage from 'src/components/pages/ConverterPage/';
import SignInPage from 'src/components/pages/SignIn/';

const Router: React.FunctionComponent = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          path={CHARTS_ROUTE_PATH}
          component={() => <ChartsPage />}
        />
        <PrivateRoute path={MAP_ROUTE_PATH} component={() => <MapPage />} />
        <PrivateRoute
          path={CONVERTER_ROUTE_PATH}
          component={() => <ConverterPage />}
        />
        <Route exact path="/" component={() => <SignInPage />} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
