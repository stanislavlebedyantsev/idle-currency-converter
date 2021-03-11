import { React } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import {
  CHARTS_ROUTER_PATH,
  MAP_ROUTER_PATH,
  CONVERTER_ROUTER_PATH,
} from '@/constants';
import PrivateRouter from './PrivateRouter';
import ChartsPage from '@/components/pages/ChartsPage/';
import MapPage from '@/components/pages/MapPage/';
import ConverterPage from '@/components/pages/ConverterPage/';
import SignInPage from '@/components/pages/SignIn/';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRouter
          path={CHARTS_ROUTER_PATH}
          component={() => <ChartsPage />}
        />
        <PrivateRouter path={MAP_ROUTER_PATH} component={() => <MapPage />} />
        <PrivateRouter
          path={CONVERTER_ROUTER_PATH}
          component={() => <ConverterPage />}
        />
        <Route exact path={'/'} component={() => <SignInPage />} />
        <Redirect from={'*'} to={'/'} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
