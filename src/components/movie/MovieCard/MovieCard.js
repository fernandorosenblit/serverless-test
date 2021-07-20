import React from 'react';
import { object, string } from 'prop-types';
import { useSelector } from 'react-redux';
import build from 'redux-object';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { CATEGORIES } from 'constants/findAMovie';
import { SERVICES } from 'constants/serviceAccessors';
import { DATE_FORMAT, MOVIE_CARD_ASPECT_RATIO, REDUX_BUILD_OPTIONS } from 'constants/constants';
import { imageUrl } from 'utils/movieUtils';

import AspectRatioContainer from 'components/common/AspectRatioContainer/AspectRatioContainer';

const MovieCard = ({ venue, movieId, category }) => {
  const { displayName, urlName, imageContent, onSaleDateUtc } = useSelector(({ api }) =>
    build(api, SERVICES.movie, movieId, REDUX_BUILD_OPTIONS)
  );

  const getLabelText = () => {
    if (onSaleDateUtc) {
      const date = dayjs(onSaleDateUtc);

      switch (category) {
        case CATEGORIES.openingThisWeek:
          return (
            <FormattedMessage
              id="fam.openingLabel"
              values={{ date: date.format(DATE_FORMAT.day) }}
            />
          );
        case CATEGORIES.comingSoon:
          return (
            <FormattedMessage
              id="fam.openingLabel"
              values={{ date: date.format(DATE_FORMAT.monthWithDay) }}
            />
          );
        default:
          return '';
      }
    }

    return '';
  };

  const showLabel = () => category && category !== CATEGORIES.onSale && !!onSaleDateUtc;

  return (
    <NavLink to={`/showtime/${urlName}${venue ? `/${venue.urlName}` : ''}`}>
      <div className="movie-card">
        {showLabel() && (
          <div className="movie-card__label">
            <span>{getLabelText()}</span>
          </div>
        )}
        <AspectRatioContainer
          aspectRatio={MOVIE_CARD_ASPECT_RATIO}
          className="movie-card__ratio-container"
        >
          <img
            className="movie-card__poster"
            src={imageUrl(imageContent?.[0])}
            alt={`Cover for ${displayName}`}
          />
        </AspectRatioContainer>
        <span className="movie-card__title">{displayName}</span>
      </div>
    </NavLink>
  );
};

MovieCard.propTypes = {
  movieId: string,
  venue: object,
  category: string
};

export default MovieCard;
