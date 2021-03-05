import { Switch, Route, Redirect } from "react-router-dom";
import { CHARTS_ROUTER_PATH, MAP_ROUTER_PATH } from "@/constants";
import ChartsPage from "@components/pages/ChartsPage/index";
import MapPage from "@components/pages/MapPage/index";
import ConverterPage from "@components/pages/ConverterPage/index";

const RouterWrapper = () => {
  return (
      <Switch>
        <Route path={CHARTS_ROUTER_PATH} render={() => <ChartsPage/>} />
        <Route path={MAP_ROUTER_PATH} render={() => <MapPage/>} />
        <Route exact path={"/"} render={() => <ConverterPage />} />
        <Redirect from={'*'} to={'/'}/>
      </Switch>
  );
};

export default RouterWrapper;
