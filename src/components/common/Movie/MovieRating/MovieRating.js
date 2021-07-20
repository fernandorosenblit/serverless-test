import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import restricted from 'assets/icons/ratings/restricted.svg';
import pg13 from 'assets/icons/ratings/pg-13.svg';
import pg from 'assets/icons/ratings/pg.svg';
import general from 'assets/icons/ratings/general.svg';
import nc17 from 'assets/icons/ratings/nc-17.svg';
import { RATINGS } from 'constants/movieRatings';
import { string } from 'prop-types';

const MovieRating = ({ rating, className }) => {
  const intl = useIntl();

  let iconSrc = null;

  switch (rating) {
    case RATINGS.restricted:
      iconSrc = restricted;
      break;
    case RATINGS.pg13:
      iconSrc = pg13;
      break;
    case RATINGS.pg:
      iconSrc = pg;
      break;
    case RATINGS.general:
      iconSrc = general;
      break;
    case RATINGS.nc17:
      iconSrc = nc17;
      break;
    default:
      iconSrc = null;
  }

  return (
    <span className={className}>
      {iconSrc ? (
        <img alt={`Rating: ${intl.formatMessage({ id: `ratings.${rating}` })}`} src={iconSrc} />
      ) : (
        <FormattedMessage id="ratings.unrated" />
      )}
    </span>
  );
};

MovieRating.propTypes = {
  rating: string.isRequired,
  className: string
};

export default MovieRating;
