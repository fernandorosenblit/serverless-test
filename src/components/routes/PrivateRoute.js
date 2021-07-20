import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { useSession } from 'hooks';
import routes from 'constants/routesPaths';
import RouteComponent from './RouteComponent';

const PrivateRoute = ({ ...route }) => {
  const location = useLocation();
  const { authenticated } = useSession();

  return authenticated ? (
    <RouteComponent {...route} />
  ) : (
    <Redirect
      to={{
        pathname: routes.login,
        state: { from: location }
      }}
    />
  );
};

export default PrivateRoute;
