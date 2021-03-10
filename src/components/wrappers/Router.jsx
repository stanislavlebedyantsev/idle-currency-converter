import { React } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CHARTS_ROUTER_PATH, MAP_ROUTER_PATH } from '@/constants';
import ChartsPage from '@/components/pages/ChartsPage/';
import MapPage from '@/components/pages/MapPage/';
import ConverterPage from '@/components/pages/ConverterPage/';

const Router = () => {
  return (
    <Switch>
      <Route path={CHARTS_ROUTER_PATH} component={() => <ChartsPage />} />
      <Route path={MAP_ROUTER_PATH} component={() => <MapPage />} />
      <Route exact path={'/'} component={() => <ConverterPage />} />
      <Redirect from={'*'} to={'/'} />
    </Switch>
  );
};

export default Router;
