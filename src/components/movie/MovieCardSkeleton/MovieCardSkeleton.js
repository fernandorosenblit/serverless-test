import React from 'react';
import { number } from 'prop-types';
import { MOVIE_CARD_ASPECT_RATIO } from 'constants/constants';
import AspectRatioContainer from 'components/common/AspectRatioContainer/AspectRatioContainer';

const MovieCardSkeleton = ({ count }) => {
  return (
    <div className="movie-card-skeleton">
      {[...Array(Math.ceil(count))].map((_, i) => (
        <div className="skeleton" key={i}>
          <AspectRatioContainer
            key={i}
            aspectRatio={MOVIE_CARD_ASPECT_RATIO}
            className="ratio-container"
          >
            <div className="placeholder image" />
          </AspectRatioContainer>
          <div className="placeholder title" />
        </div>
      ))}
    </div>
  );
};

MovieCardSkeleton.propTypes = {
  count: number.isRequired
};

export default MovieCardSkeleton;
