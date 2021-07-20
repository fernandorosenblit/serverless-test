import React from 'react';
import { node, func, string, bool } from 'prop-types';
import { useIntl } from 'react-intl';
import cn from 'classnames';

import Button from 'components/common/Button/Button';

const SummarySection = ({ children, heading, image, onClick, lightCopy }) => {
  const intl = useIntl();

  // TODO: Retrieve image and alt text from api.
  return (
    <section className="showtime-side-bar-summary">
      <div className="d-flex showtime-side-bar-summary__details">
        <span className="showtime-side-bar-summary__heading body3 semibold">
          {intl.formatMessage({ id: heading })}
        </span>
        {image && <img className="showtime-side-bar-summary__logo" alt="" src={image} />}
        <Button primary link className="body3" onClick={onClick}>
          {intl.formatMessage({ id: 'sidebar_showtime.edit' })}
        </Button>
      </div>
      <div
        className={cn('showtime-side-bar-summary__content', {
          'light-copy': lightCopy
        })}
      >
        {children}
      </div>
    </section>
  );
};

SummarySection.propTypes = {
  children: node,
  heading: string.isRequired,
  image: string,
  onClick: func,
  lightCopy: bool
};

export default SummarySection;
