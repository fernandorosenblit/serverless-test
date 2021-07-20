import React from 'react';
import cn from 'classnames';
import { node, string } from 'prop-types';

const FixedSideBar = ({ children, className }) => (
  <section className={cn('fixed-side-bar-container', className)}>{children}</section>
);

FixedSideBar.propTypes = {
  children: node.isRequired,
  className: string
};

export default FixedSideBar;
