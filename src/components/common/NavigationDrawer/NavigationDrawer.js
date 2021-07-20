import React from 'react';
import { array, bool } from 'prop-types';
import cn from 'classnames';

const NavigationDrawer = ({ isOpen, children }) => {
  return <div className={cn('navigation-drawer', { open: isOpen })}>{children}</div>;
};

export default NavigationDrawer;

NavigationDrawer.propTypes = {
  isOpen: bool.isRequired,
  children: array // eslint-disable-line
};
