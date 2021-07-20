import React from 'react';
import cn from 'classnames';
import { func, string } from 'prop-types';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { darkerBlue } from 'styles/common/_constants.scss';

const CloseButton = ({ onClick, fill = darkerBlue, className }) => (
  <button className={cn('close-button', className)} type="button" onClick={onClick}>
    <CloseIcon width={10} height={10} viewBox="0 0 14 14" fill={fill} />
  </button>
);

CloseButton.propTypes = {
  onClick: func.isRequired,
  fill: string,
  className: string
};

export default CloseButton;
