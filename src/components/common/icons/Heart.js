import React from 'react';
import { bool } from 'prop-types';

import { primaryColor, white } from 'styles/common/_constants.scss';

import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';

const Heart = ({ active = false, ...props }) => (
  <span {...props} style={{ height: 'fit-content' }}>
    <HeartIcon fill={active ? primaryColor : 'none'} stroke={active ? primaryColor : white} />
  </span>
);

Heart.propTypes = {
  active: bool
};

export default Heart;
