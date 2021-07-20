import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import MovieRating from 'components/common/Movie/MovieRating/MovieRating';
import MovieRuntime from 'components/common/Movie/MovieRuntime/MovieRuntime';
import { FEATURED_MOVIE_ASPECT_RATIO } from 'constants/constants';
import AspectRatioContainer from 'components/common/AspectRatioContainer/AspectRatioContainer';

const FeaturedMovie = ({
  movie: { featuredImageContent, displayName, ratings, runtime, urlName }
}) => {
  const intl = useIntl();

  return (
    <div className="featured-movie">
      <AspectRatioContainer aspectRatio={FEATURED_MOVIE_ASPECT_RATIO}>
        <img
          src={featuredImageContent?.[0].image.url}
          alt={intl.formatMessage({ id: 'alt.coverFor' }, { displayName })}
        />
      </AspectRatioContainer>
      <div className="featured-overlay">
        <div>
          <span className="featured-movie-title">{displayName}</span>
          <div>
            <MovieRating rating={ratings?.[0].ratingType.name} className="featured-movie-info" />
            <MovieRuntime runtime={runtime} className="featured-movie-info" />
          </div>
        </div>
        <NavLink to={`/showtime/${urlName}`} className="btn btn--primary btn--outlined get-tickets">
          <FormattedMessage id="common.getTickets" />
        </NavLink>
      </div>
    </div>
  );
};

FeaturedMovie.propTypes = {
  movie: shape({
    featuredImageContent: array,
    displayName: string
  })
};

export default FeaturedMovie;
