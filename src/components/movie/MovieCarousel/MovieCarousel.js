import React from 'react';
import { arrayOf, object, string } from 'prop-types';

// Constants
import { SCREEN_SIZES } from 'constants/constants';

// Components
import Carousel from 'components/common/Carousel/Carousel';
import MovieCard from 'components/movie/MovieCard/MovieCard';
import MovieCardSkeleton from 'components/movie/MovieCardSkeleton/MovieCardSkeleton';
import NoMovies from 'components/movie/NoMovies/NoMovies';
import SliderArrow from 'components/common/Carousel/SliderArrow/SliderArrow';

// Hooks
import { useStdMediaQuery } from 'hooks';

const MovieCarousel = ({ venue, movieList, meta, category }) => {
  const { size } = useStdMediaQuery();

  const getSlidesToShow = () => {
    switch (size) {
      case SCREEN_SIZES.m:
        return 3;
      case SCREEN_SIZES.l:
        return 4;
      case SCREEN_SIZES.xl:
        return 5;
      default:
        return 2.5;
    }
  };

  const showCarousel = () => meta.success && movieList.length;

  const carouselSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    centerMode: false,
    swipeToSlide: true,
    nextArrow: <SliderArrow />,
    prevArrow: <SliderArrow previous />
  };

  return (
    <>
      {meta && !meta.loading ? (
        <>
          {showCarousel() ? (
            <Carousel className="lower-dots" carouselSettings={carouselSettings}>
              {movieList.map(movie => (
                <MovieCard key={movie.id} movieId={movie.id} venue={venue} category={category} />
              ))}
            </Carousel>
          ) : (
            <NoMovies category={category} />
          )}
        </>
      ) : (
        <MovieCardSkeleton count={getSlidesToShow()} />
      )}
    </>
  );
};

MovieCarousel.propTypes = {
  movieList: arrayOf(object),
  venue: object,
  meta: object,
  category: string
};

export default MovieCarousel;
