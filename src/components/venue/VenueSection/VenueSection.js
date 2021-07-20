import React from 'react';
import { bool, func, object, oneOfType } from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Hooks
import { useToggle } from 'hooks';

// Utils
import { metersToMiles } from 'utils/unitConverter';

// Assets
import { ReactComponent as UpButton } from 'assets/icons/up-button.svg';

// Components
import Heart from 'components/common/icons/Heart';
import MovieCarousel from 'components/movie/MovieCarousel/MovieCarousel';

const VenueSection = ({ venue, venueMeta, scrollUp }) => {
  const [isFavorited, toggleIsFavorited] = useToggle(false);

  const movies = venue?.eventSchedules?.map(({ movie }) => movie);

  return (
    <div key={venue.id} className="venue-section">
      <div className="venue-section__header">
        <Heart active={isFavorited} onClick={toggleIsFavorited} className="venue-section__heart" />
        <div className="venue-section__title-container">
          <h2 className="venue-section__title">{venue.displayName}</h2>
          <span className="venue-section__distance">
            <FormattedMessage
              id="distance.miles"
              values={{ value: metersToMiles(venue?.distance) }}
            />
          </span>
        </div>
      </div>
      <div>
        {movies && (
          <MovieCarousel
            venue={{ id: venue.id, urlName: venue.urlName }}
            movieList={movies}
            meta={venueMeta}
          />
        )}
      </div>
      {scrollUp && (
        <span className="venue-section__up-btn" onClick={scrollUp}>
          <UpButton />
        </span>
      )}
    </div>
  );
};

VenueSection.propTypes = {
  venue: object.isRequired,
  venueMeta: object,
  scrollUp: oneOfType([func, bool])
};

export default VenueSection;
