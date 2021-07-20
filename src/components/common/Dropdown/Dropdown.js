import React, { useRef } from 'react';
import Select from 'react-select';
import cn from 'classnames';
import { array, any, node, oneOf, string, bool, object } from 'prop-types';

import getComponents from 'utils/getComponents';
import { white } from 'styles/common/_constants.scss';

import { ReactComponent as Chevron } from 'assets/icons/chevron.svg';

const deafultComponents = {
  IconWrapper: 'span'
};

const Dropdown = ({
  className,
  options,
  overrides,
  icon: Icon,
  iconPlacement = 'right',
  disableIndicator = false,
  dropdownRef,
  ...props
}) => {
  let selectRef = useRef();
  if (dropdownRef) selectRef = dropdownRef;

  const setFocus = () => selectRef.current.select.focus();

  const {
    IconWrapper: { component: IconWrapper, props: iconWrapperProps }
  } = getComponents(deafultComponents, overrides);

  const iconLeft = iconPlacement === 'left';

  return (
    <div className={cn('dropdown-wrapper', className)} onClick={setFocus}>
      <Select
        options={options}
        className={cn(
          'react-select__container',
          { 'with-icon': !!Icon },
          { 'icon-left': iconLeft }
        )}
        classNamePrefix="react-select"
        ref={selectRef}
        openMenuOnFocus
        components={{
          IndicatorSeparator: null,
          DropdownIndicator: disableIndicator
            ? null
            : ({ isFocused }) => (
                <Chevron
                  fill={white}
                  style={{
                    margin: '1rem',
                    transform: `rotate(${isFocused ? '-90deg' : '90deg'})`,
                    transition: 'all 200ms'
                  }}
                />
              )
        }}
        styles={{ input: () => ({ margin: 0, padding: 0, width: 'auto' }) }}
        {...props}
      />
      {Icon && (
        <IconWrapper
          {...iconWrapperProps}
          className={cn(
            'react-select__icon',
            { 'icon-left': iconLeft },
            iconWrapperProps.className
          )}
        >
          {Icon}
        </IconWrapper>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  className: string,
  options: array,
  overrides: any,
  icon: node,
  iconPlacement: oneOf(['right', 'left']),
  disableIndicator: bool,
  dropdownRef: object
};

export default Dropdown;
