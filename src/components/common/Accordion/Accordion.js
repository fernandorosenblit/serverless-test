import React, { useState, useCallback } from 'react';
import { string, bool, node } from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Chevron } from 'assets/icons/chevron.svg';

const Accordion = ({ children, title, defaultOpen }) => {
  const [isActive, setActive] = useState(defaultOpen);

  const toggleAccordion = useCallback(() => {
    setActive(prev => !prev);
  }, []);

  return (
    <div className="accordion">
      <button type="button" className="accordion__button" onClick={toggleAccordion}>
        <h6 className="body1 semibold">{title}</h6>
        <Chevron
          className={cn('accordion__arrow', {
            open: isActive
          })}
        />
      </button>
      <div
        className={cn('accordion__content', {
          open: isActive
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;

Accordion.propTypes = {
  children: node.isRequired,
  title: string.isRequired,
  defaultOpen: bool
};
