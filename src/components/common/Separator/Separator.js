import React from 'react';
import { bool } from 'prop-types';
import cn from 'classnames';

const Separator = ({ hasContainerWidth = true, condensed }) => (
  <div
    className={cn('separator', { 'container-width': hasContainerWidth, condensed: !!condensed })}
  />
);

Separator.propTypes = {
  hasContainerWidth: bool,
  condensed: bool
};

export default Separator;
