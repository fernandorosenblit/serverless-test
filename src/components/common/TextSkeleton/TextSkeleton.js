import React from 'react';
import { string } from 'prop-types';
import cn from 'classnames';

const TextSkeleton = ({ width = '5rem', height = '1.5rem', className }) => (
  <div className={cn('text-skeleton', className)} style={{ width, height }} />
);

TextSkeleton.propTypes = {
  width: string,
  height: string,
  className: string
};

export default TextSkeleton;
