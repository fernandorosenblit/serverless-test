import React from 'react';
import { bool, string, func } from 'prop-types';
import cn from 'classnames';
import { ReactComponent as Chevron } from 'assets/icons/chevron.svg';

const SliderArrow = ({ previous, className, customClassName, onClick }) => {
  return (
    <div className={cn('arrow', className, customClassName, { previous })} onClick={onClick}>
      <Chevron />
    </div>
  );
};

SliderArrow.propTypes = {
  previous: bool,
  className: string,
  customClassName: string,
  onClick: func
};

export default SliderArrow;
