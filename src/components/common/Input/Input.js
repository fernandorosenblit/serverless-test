/* eslint-disable react/forbid-prop-types */
import React, { useRef } from 'react';
import { any, arrayOf, func, object, oneOf, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

import getComponents from 'utils/getComponents';
import { parseInputErrors } from 'utils/helpers';

import { ReactComponent as Cancel } from 'assets/icons/cancel.svg';

const deafultComponents = {
  Input: 'input',
  Wrapper: 'div',
  Errors: 'span',
  IconWrapper: 'span',
  ClearSearch: 'span'
};

const Input = ({
  icon: Icon,
  iconPlacement = 'right',
  placeholder,
  onChange,
  value,
  errors,
  overrides,
  className,
  clearSearch,
  onBlur,
  onFocus,
  ...props
}) => {
  const {
    Input: { component: Input, props: inputProps },
    Wrapper: { component: Wrapper, props: wrapperProps },
    Errors: { component: Errors, props: errorsProps },
    IconWrapper: { component: IconWrapper, props: iconWrapperProps },
    ClearSearch: { component: ClearSearch, props: clearSearchProps }
  } = getComponents(deafultComponents, overrides);

  const inputElement = useRef(null);
  const wrapperRef = useRef(null);
  const iconLeft = iconPlacement === 'left';

  const clearSearchHandler = () => {
    inputElement.current.focus();
    clearSearch();
  };

  const onFocusHandler = () => {
    if (typeof onFocus === 'function') {
      onFocus();
    }
  };

  return (
    <Wrapper
      ref={wrapperRef}
      {...wrapperProps}
      className={cn('input-wrapper', { errors }, className, wrapperProps.className)}
    >
      <Input
        ref={inputElement}
        value={value}
        onChange={onChange}
        onFocus={onFocusHandler}
        onBlur={onBlur}
        placeholder={placeholder}
        {...props}
        {...inputProps}
        className={cn(
          'input',
          { 'with-icon': !!Icon },
          { 'icon-left': iconLeft },
          inputProps.className
        )}
      />
      {Icon && (
        <IconWrapper
          {...iconWrapperProps}
          className={cn('input-icon', { 'icon-left': iconLeft }, iconWrapperProps.className)}
        >
          {Icon}
        </IconWrapper>
      )}
      {!!clearSearch && value && (
        <ClearSearch
          onClick={clearSearchHandler}
          {...clearSearchProps}
          className={cn(
            'input-icon clear-search',
            { 'icon-left': !iconLeft },
            clearSearchProps.className
          )}
        >
          <Cancel />
        </ClearSearch>
      )}
      {errors && (
        <Errors {...errorsProps} className={cn('errors', errorsProps.className)}>
          <FormattedMessage
            id={parseInputErrors(errors)}
            defaultMessage={parseInputErrors(errors)}
          />
        </Errors>
      )}
    </Wrapper>
  );
};

Input.propTypes = {
  icon: any,
  placeholder: string,
  onChange: func.isRequired,
  value: string.isRequired,
  errors: arrayOf(string),
  className: string,
  iconPlacement: oneOf(['right', 'left']),
  overrides: object,
  clearSearch: func,
  onBlur: func,
  onFocus: func
};

export default Input;
