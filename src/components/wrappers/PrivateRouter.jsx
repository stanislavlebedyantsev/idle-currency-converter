import { React } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouter = ({path, component}) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  return isAuth ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRouter;