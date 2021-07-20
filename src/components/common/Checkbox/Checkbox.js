/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';
import { bool, func, string } from 'prop-types';
import cn from 'classnames';

import { ReactComponent as CheckboxIcon } from 'assets/icons/checkbox.svg';
import { ReactComponent as CheckboxIconChecked } from 'assets/icons/checkbox-checked.svg';

const Checkbox = ({ id, label, selected, onSelect, labelClassName }) => (
  <div className="checkbox">
    <input
      className="no-gutters"
      id={`${label}-option-${id}`}
      name={`${label}-option-${id}`}
      type="checkbox"
      onChange={onSelect}
    />
    <label className={cn('body3', labelClassName)} htmlFor={`${label}-option-${id}`}>
      {selected ? <CheckboxIconChecked /> : <CheckboxIcon />}
      {label}
    </label>
  </div>
);

export default memo(Checkbox);

Checkbox.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  selected: bool.isRequired,
  onSelect: func.isRequired,
  labelClassName: string
};
