import React, { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/types/rootStateTypes';

type Props = {
  path: string;
  component: ComponentType<React.ReactElement>;
};

const PrivateRoute = (props: Props): React.ReactElement => {
  const { path, component } = props;
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  return isAuth ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
