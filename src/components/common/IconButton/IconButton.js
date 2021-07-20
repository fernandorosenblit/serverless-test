import React from 'react';
import { bool, func, object } from 'prop-types';
import cn from 'classnames';

const IconButton = ({ children, onClick, rounded, inverted }) => {
  return (
    <button
      type="button"
      className={cn('icon-button', {
        'icon-button__rounded': !!rounded,
        'icon-button__inverted': !!inverted
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;

IconButton.propTypes = {
  onClick: func.isRequired,
  children: object.isRequired,
  rounded: bool,
  inverted: bool
};
