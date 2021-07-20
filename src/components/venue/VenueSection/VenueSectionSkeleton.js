import React from 'react';

import Heart from 'components/common/icons/Heart';
import MovieCarousel from 'components/movie/MovieCarousel/MovieCarousel';
import TextSkeleton from 'components/common/TextSkeleton/TextSkeleton';

const VenueSectionSkeleton = () => (
  <div className="venue-section">
    <div className="venue-section__header">
      <Heart className="venue-section__heart skeleton" />
      <div className="venue-section__title-container">
        <h2 className="venue-section__title">
          <TextSkeleton width="25rem" height="2rem" />
        </h2>
        <span className="venue-section__distance">
          <TextSkeleton width="70%" />
        </span>
      </div>
    </div>
    <div>
      <MovieCarousel />
    </div>
  </div>
);

export default VenueSectionSkeleton;
