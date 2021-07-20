import React from 'react';
import { number } from 'prop-types';

const Badge = ({ text }) => {
  return <span className="badge caption semibold">{text}</span>;
};

Badge.propTypes = {
  text: number.isRequired
};

export default Badge;
