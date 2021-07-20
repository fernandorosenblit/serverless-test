import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import Modal from 'react-modal';
import cn from 'classnames';

import useDispatch from 'hooks/useDispatch';
import useTruncateWithEllipsis from 'hooks/utils/useTruncateWithEllipsis';
import { imageUrl, imageAlt, releaseYear, runtimeToHs, releaseDate } from 'utils/movieUtils';
import { switchMovieDetailsModal } from 'state/actions/uiActions';

import { ReactComponent as BookmarkIcon } from 'assets/icons/bookmark.svg';

import CloseButton from 'components/common/CloseButton/CloseButton';
import Button from 'components/common/Button/Button';
import PlayButton from 'components/common/PlayButton/PlayButton';
import MovieRating from 'components/common/Movie/MovieRating/MovieRating';
import useShowtime from 'components/showtime/useShowtime';

const labels = {
  conciergeButton: { id: 'movie_detail.concierge' },
  releaseDate: { id: 'movie_detail.header.release_date' },
  sypnosys: { id: 'movie_detail.header.sypnosys' },
  genre: { id: 'movie_detail.header.genre' },
  cast: { id: 'movie_detail.header.cast' },
  director: { id: 'movie_detail.header.director' },
  movies: { id: 'movie_detail.header.movies' },
  coverAlt: { id: 'alt.movie_detail.cover' },
  recommendedFilmAlt: { id: 'alt.movie_detail.more_movies' }
};

// const dummyRecommendedFilmList = [0, 1, 2, 3, 4];

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */

const MovieDetailsModal = () => {
  const intl = useIntl();
  const switchModalAction = useDispatch(switchMovieDetailsModal);
  const isOpen = useSelector(
    ({
      ui: {
        movieDetailsModal: { isOpen }
      }
    }) => isOpen
  );
  const { currentMovie } = useShowtime();
  const { textToShow, ReadMore } = useTruncateWithEllipsis(
    currentMovie?.textContent?.[0]?.content ?? ''
  );

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const handleCloseModal = useCallback(() => switchModalAction({ isOpen: false, movieId: null }), [
    switchModalAction
  ]);

  return (
    <Modal
      className="movie-detail-modal-content"
      overlayClassName="movie-detail-modal-overlay"
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
    >
      <div className="movie-details-modal-container">
        <CloseButton className="movie-details-modal-container__close" onClick={handleCloseModal} />
        {currentMovie?.videoContent && (
          <div className="movie-details-trailer-wrapper">
            <img src="https://fastly.syfy.com/sites/syfy/files/styles/1200x680/public/2020/10/black-widow-movie.jpg?offset-x=0&offset-y=0" />
            <PlayButton />
          </div>
        )}
        <div
          className={cn('movie-details-content-wrapper', {
            'movie-details-content-wrapper--no-trailer': !currentMovie?.videoContent
          })}
        >
          <section className="movie-details-main-section movie-details-content-wrapper__separator">
            {currentMovie?.imageContent && (
              <img
                className="movie-details-main-section__cover"
                src={imageUrl(currentMovie?.imageContent[0])}
                alt={imageAlt(currentMovie?.imageContent)}
              />
            )}
            <div className="movie-details-main-section__right-wrapper">
              <span className="movie-details-main-section__title-wrapper">
                <BookmarkIcon />
                <span className="movie-details-main-section__film-title">
                  {currentMovie?.displayName}
                </span>
              </span>
              <span className="movie-details-main-section__release-date">
                {`(${releaseYear(currentMovie?.releaseDate)})`}
              </span>
              <div>
                {currentMovie?.ratings && (
                  <MovieRating
                    rating={currentMovie?.ratings[0].ratingType.name}
                    className="movie-details-main-section__rating"
                  />
                )}
                <span className="movie-details-main-section__duration">
                  {runtimeToHs(currentMovie?.runtime)}
                </span>
              </div>
              <Button className="movie-details-main-section__button" onClick={() => {}}>
                <BookmarkIcon />
                {intl.formatMessage(labels.conciergeButton)}
              </Button>
            </div>
          </section>
          <section className="movie-details-info-section movie-details-content-wrapper__separator">
            <div className="movie-details-info-section__left-wrapper">
              <h3 className="movie-details-info-section__header">
                {intl.formatMessage(labels.releaseDate)}
              </h3>
              <span className="movie-details-info-section__text movie-details-info-section__text--white">
                {releaseDate(currentMovie?.releaseDate)}
              </span>
              <h3 className="movie-details-info-section__header">
                {intl.formatMessage(labels.genre)}
              </h3>
              <span className="movie-details-info-section__text movie-details-info-section__text--white">
                {currentMovie?.genres && currentMovie?.genres[0]?.displayName}
              </span>
            </div>
            <div className="movie-details-info-section__right-wrapper">
              <h3 className="movie-details-info-section__header">
                {intl.formatMessage(labels.sypnosys)}
              </h3>
              <div className="movie-details-info-section__text">{textToShow}</div>
              <ReadMore />
              <h3 className="movie-details-info-section__header">
                {intl.formatMessage(labels.cast)}
              </h3>
              <span className="movie-details-info-section__text">-</span>
              <h3 className="movie-details-info-section__header">
                {intl.formatMessage(labels.director)}
              </h3>
              <span className="movie-details-info-section__text movie-details-info-section__text--white">
                -
              </span>
            </div>
          </section>
          {/* <section className="movie-details-movies-section">
            <h3 className="movie-details-movies-section__header">
              {intl.formatMessage(labels.movies)}
            </h3>
            <div className="movie-details-movies-section__cards-wrapper">
              {dummyRecommendedFilmList.map(() => (
                <div className="movie-details-movie-card">
                  <img
                    alt={intl.formatMessage(labels.recommendedFilmAlt)}
                    className="movie-details-movie-card__image"
                    src="https://cdn.images.dev.external.hollywood.com/1080x1620/filters:format(webp)/en-us/movies/833/posters/godzilla-vs-kong-poster.jpg"
                  />
                  <span className="movie-details-movie-card__text">Little Woman</span>
                </div>
              ))}
            </div>
          </section> */}
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailsModal;
