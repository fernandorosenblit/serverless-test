/* eslint-disable react/forbid-prop-types */
import React from 'react';
import cn from 'classnames';

import getComponents from 'utils/getComponents';
import { any, bool, func, node, object, oneOf, oneOfType, string } from 'prop-types';

const defaultComponents = {
  ButtonElem: 'button',
  IconWrapper: 'span'
};

const Button = ({
  icon: Icon,
  iconPlacement = 'right',
  children,
  onClick,
  primary,
  outlined,
  link,
  className,
  overrides,
  disabled = false
}) => {
  const {
    ButtonElem: { component: ButtonElem, props: buttonProps },
    IconWrapper: { component: IconWrapper, props: iconWrapperProps }
  } = getComponents(defaultComponents, overrides);

  const iconLeft = iconPlacement === 'left';

  return (
    <ButtonElem
      onClick={onClick}
      disabled={disabled}
      {...buttonProps}
      className={cn(
        'btn',
        { 'btn--with-icon': !!Icon },
        { 'btn--icon-left': iconLeft },
        { 'btn--outlined': outlined },
        { 'btn--primary': primary },
        { 'btn--link': link },
        { 'btn--disabled': disabled },
        className,
        buttonProps.className
      )}
    >
      {Icon && (
        <IconWrapper
          {...iconWrapperProps}
          className={cn('btn__icon', { 'btn__icon--left': iconLeft }, iconWrapperProps.className)}
        >
          {Icon}
        </IconWrapper>
      )}
      {children}
    </ButtonElem>
  );
};

Button.propTypes = {
  children: node,
  onClick: func.isRequired,
  outlined: bool,
  primary: bool,
  link: bool,
  className: oneOfType([string, object]),
  overrides: object,
  icon: any,
  iconPlacement: oneOf(['right', 'left']),
  disabled: bool
};

export default Button;
