import React from 'react';
import cn from 'classnames';

import { object, oneOfType, string } from 'prop-types';

const ButtonSkeleton = ({ width = '15rem', height = '4rem', className }) => (
  <div className={cn('btn skeleton', className)} style={{ width, height }} />
);

ButtonSkeleton.propTypes = {
  className: oneOfType([string, object]),
  width: string,
  height: string
};

export default ButtonSkeleton;
