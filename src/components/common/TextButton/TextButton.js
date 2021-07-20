import React from 'react';
import { object, func, bool } from 'prop-types';
import cn from 'classnames';

const TextButton = ({ children, onClick, semibold, capitalize }) => (
  <button type="button" onClick={onClick}>
    <span
      className={cn('caption', {
        semibold,
        capitalize
      })}
    >
      {children}
    </span>
  </button>
);

export default TextButton;

TextButton.propTypes = {
  children: object.isRequired,
  onClick: func.isRequired,
  semibold: bool,
  capitalize: bool
};
