import React from 'react';
import { useSelector } from 'react-redux';
import { object, string, func } from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Hooks
import { useChangeLocation } from 'hooks';

// Components
import MovieRating from 'components/common/Movie/MovieRating/MovieRating';
import MovieRuntime from 'components/common/Movie/MovieRuntime/MovieRuntime';

// Constants
import { SEARCH_RESULTS_CATEGORIES } from 'constants/constants';

// Utils
import { imageUrl } from 'utils/movieUtils';
import { calculateDistance } from 'utils/haversine';

// Assets
import { ReactComponent as Enter } from 'assets/icons/enter.svg';

const SearchMatch = ({ match, category, clearSearch }) => {
  const { handleOptionClick } = useChangeLocation();
  const { lat, lng } = useSelector(({ location: { lat, lang } }) => ({ lat, lang }));

  const locationClickHandler = match => {
    handleOptionClick({ value: match });
    clearSearch();
  };

  const renderMovieMatch = () => {
    const { imageContent, displayName, runtime, ratings } = match;

    return (
      <div className="match movie">
        {imageContent && (
          <img
            className="poster"
            src={imageUrl(imageContent?.[0])}
            alt={imageContent?.[0].image.urlAltText}
          />
        )}
        <div className="data">
          <h4>{displayName}</h4>
          <div className="specs">
            {ratings && <MovieRating rating={ratings?.[0].ratingType.name} className="rating" />}
            <MovieRuntime runtime={runtime} className="additional-info" />
          </div>
        </div>
      </div>
    );
  };

  const renderVenueMatch = () => {
    const {
      displayName,
      location: { latitude, longitude }
    } = match;

    return (
      <div className="match venue">
        <div className="data">
          <h4>{displayName}</h4>
          <div className="specs">
            {lat && lng && (
              <span className="additional-info">
                {calculateDistance([latitude, longitude], [lat, lng])} mi.
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderLocationMatch = () => {
    const { displayName } = match;

    return (
      <div className="match location" onClick={() => locationClickHandler(match)}>
        <div className="data">
          <h4>{displayName}</h4>
          <div className="update-location">
            <span>
              <FormattedMessage id="search.update_location" />
            </span>
            <Enter />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {category === SEARCH_RESULTS_CATEGORIES.movies && <>{renderMovieMatch()}</>}
      {category === SEARCH_RESULTS_CATEGORIES.theatres && <>{renderVenueMatch()}</>}
      {category === SEARCH_RESULTS_CATEGORIES.locations && <>{renderLocationMatch()}</>}
    </>
  );
};

SearchMatch.propTypes = {
  match: object,
  category: string,
  clearSearch: func
};

export default SearchMatch;
