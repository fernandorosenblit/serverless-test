import React from 'react';
import { useDispatch } from 'react-redux';
import { array, shape, string, number } from 'prop-types';
import { useIntl } from 'react-intl';

import { imageUrl, imageAlt } from 'utils/movieUtils';
import { switchMovieDetailsModal } from 'state/actions/uiActions';

import MovieRating from 'components/common/Movie/MovieRating/MovieRating';
import MovieRuntime from 'components/common/Movie/MovieRuntime/MovieRuntime';
import PlayButton from 'components/common/PlayButton/PlayButton';
import MovieDetailsModal from 'components/movie/MovieDetailsModal/MovieDetailsModal';
import Button from 'components/common/Button/Button';

const MovieDetails = ({ currentMovie }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { imageContent, displayName, ratings, runtime, id, videoContent } = currentMovie;

  const handleOpenDetailsModal = () =>
    dispatch(switchMovieDetailsModal({ isOpen: true, movieId: id }));

  const handleChangeMovie = () => {};

  return (
    <div className="showtime-sidebar__movie d-flex">
      {imageContent && (
        <div className="showtime-sidebar__poster" onClick={handleOpenDetailsModal}>
          <img src={imageUrl(imageContent[0])} alt={imageAlt(imageContent)} />
          {videoContent && <PlayButton />}
        </div>
      )}
      <div className="showtime-sidebar__movie-details">
        <div onClick={handleOpenDetailsModal}>
          <h4 className="showtime-sidebar__movie-name">{displayName}</h4>
          {ratings && (
            <MovieRating
              rating={ratings[0].ratingType.name}
              className="showtime-sidebar__movie-rating"
            />
          )}
          <MovieRuntime runtime={runtime} className="showtime-sidebar__movie-runtime" />
        </div>
        <Button
          primary
          onClick={handleOpenDetailsModal}
          className="body3 showtime-sidebar__movie-btn-primary"
        >
          {intl.formatMessage({ id: 'sidebar_showtime.movie_details' })}
        </Button>
        <Button primary outlined className="body3" onClick={handleChangeMovie}>
          {intl.formatMessage({ id: 'sidebar_showtime.change_movie' })}
        </Button>
      </div>
      <MovieDetailsModal />
    </div>
  );
};

MovieDetails.propTypes = {
  currentMovie: shape({ imageContent: array, displayName: string, ratings: array, runtime: number })
    .isRequired
};

export default MovieDetails;
