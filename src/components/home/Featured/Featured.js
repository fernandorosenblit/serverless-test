import React from 'react';

import Carousel from 'components/common/Carousel/Carousel';
import { useFeatured, useStdMediaQuery } from 'hooks';
import { RELS } from 'constants/entityRels';

import FeaturedMovie from './FeaturedMovie/FeaturedMovie';
import FeaturedMovieSkeleton from './FeaturedMovie/FeaturedMovieSkeleton';

const query = {
  include: [RELS.movie.imageContent, { [RELS.movie.ratings]: RELS.movieRating.ratingType }]
};

const Featured = () => {
  const [featuredMovies] = useFeatured(query);

  const { isMedium, isLarge } = useStdMediaQuery();

  let slidesToShow = 1;
  if (isMedium) slidesToShow = 2;
  if (isLarge) slidesToShow = 3;

  const carouselSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    centerMode: false,
    swipeToSlide: true
  };

  return (
    <div className="featured">
      <Carousel carouselSettings={carouselSettings}>
        {featuredMovies?.map(movie => <FeaturedMovie key={movie.id} movie={movie} />)}
        {!featuredMovies &&
          [...Array(slidesToShow)].map((_, i) => <FeaturedMovieSkeleton key={i} />)}
      </Carousel>
    </div>
  );
};

export default Featured;
