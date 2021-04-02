import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import {
  CHARTS_ROUTE_PATH,
  MAP_ROUTE_PATH,
  CONVERTER_ROUTE_PATH,
  MAIN_ROUTE_PATH,
} from '@/constants';
import PrivateRoute from './PrivateRoute';
import ChartsPage from '@/components/pages/ChartsPage';
import MapPage from '@/components/pages/MapPage';
import ConverterPage from '@/components/pages/ConverterPage';
import SignInPage from '@/components/pages/SignIn';

const Router: React.FunctionComponent = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <PrivateRoute
          path={CHARTS_ROUTE_PATH}
          component={() => <ChartsPage />}
        /> */}
        <PrivateRoute path={MAP_ROUTE_PATH} component={() => <MapPage />} />
        <PrivateRoute
          path={CONVERTER_ROUTE_PATH}
          component={() => <ConverterPage />}
        />
        <Route exact path={MAIN_ROUTE_PATH} component={() => <SignInPage />} />
        <Redirect from="*" to={MAIN_ROUTE_PATH} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
