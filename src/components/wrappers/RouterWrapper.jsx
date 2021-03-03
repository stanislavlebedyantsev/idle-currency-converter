import { Switch, Route, Redirect } from "react-router-dom";
import { CHARTS_ROUTER_PATH } from "@/constants";
import ConverterContainer from "@components/converterComponents/converterContainer";
import ChartsContainer from "@components/chartsComponents/chartContainer";
const RouterWrapper = () => {
  return (
      <Switch>
        <Route path={CHARTS_ROUTER_PATH} render={() => <ChartsContainer/>} />
        <Route exact path={"/"} render={() => <ConverterContainer />} />
        <Redirect from={'*'} to={'/'}/>
      </Switch>
  );
};

export default RouterWrapper;
