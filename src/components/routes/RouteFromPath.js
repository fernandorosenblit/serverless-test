import React from 'react';

import PrivateRoute from './PrivateRoute';
import RouteComponent from './RouteComponent';

const RouteFromPath = ({ ...route }) =>
  route.private ? <PrivateRoute {...route} /> : <RouteComponent {...route} />;

export default RouteFromPath;
