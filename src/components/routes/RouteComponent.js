import React from 'react';
import { Route } from 'react-router-dom';
import { func, bool, object, oneOfType } from 'prop-types';

import withLayout from 'components/common/Layout/Layout';

const RouteComponent = ({
  component: Component,
  layout = true,
  disableHeader = false,
  disableFooter = false,
  ...route
}) =>
  layout ? (
    <Route render={withLayout(Component, disableHeader, disableFooter)} {...route} />
  ) : (
    <Route {...route}>{<Component />}</Route>
  );

RouteComponent.propTypes = {
  component: oneOfType([func, object]).isRequired,
  layout: bool,
  disableHeader: bool,
  disableFooter: bool
};

export default RouteComponent;
