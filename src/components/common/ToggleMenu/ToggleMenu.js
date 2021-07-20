import React from 'react';
import { useIntl } from 'react-intl';
import { arrayOf, shape, string, number, func } from 'prop-types';
import cn from 'classnames';

const ToggleMenu = ({ MenuOption, currentId, onChange, className = '' }) => {
  const intl = useIntl();

  return (
    <div className={className}>
      <div className="toggle-menu-header">
        {MenuOption.map(option => (
          <button
            key={option.id}
            type="button"
            className={cn('toggle-menu-header__title', {
              'toggle-menu-header__title--active': currentId === option.id
            })}
            onClick={() => onChange(option)}
          >
            {intl.formatMessage({ id: option.title })}
          </button>
        ))}
      </div>
    </div>
  );
};

ToggleMenu.propTypes = {
  MenuOption: arrayOf(shape({ title: string.isRequired, id: number.isRequired })),
  currentId: number.isRequired,
  onChange: func.isRequired,
  className: string
};

export default ToggleMenu;
