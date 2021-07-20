import React, { useState, Fragment, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { array } from 'prop-types';
import { orderBy } from 'lodash';

// Constants
import {
  INITIAL_VENUES_COUNT,
  SHOW_MORE_VENUES_COUNT,
  FILTER_VENUE_OPTIONS
} from 'constants/constants';

// Hooks
import { useStdMediaQuery, useVenues, useToggleableFilter } from 'hooks';

// Components
import VenueSection from 'components/venue/VenueSection/VenueSection';
import Button from 'components/common/Button/Button';
import Separator from 'components/common/Separator/Separator';
import VenueSectionSkeleton from 'components/venue/VenueSection/VenueSectionSkeleton';
import SearchLocation from 'components/common/SearchLocation/SearchLocation';

const FindAVenue = ({ geoVenues }) => {
  const { ToggleableFilter, isAsc, orderByTerm } = useToggleableFilter(FILTER_VENUE_OPTIONS);
  const [venues, venuesMeta] = useVenues(geoVenues);

  const [visibleVenues, setVisibleVenues] = useState(INITIAL_VENUES_COUNT);
  const showMoreVenues = () => setVisibleVenues(visibleVenues + SHOW_MORE_VENUES_COUNT);

  const [displayVenues, setDisplayVenues] = useState([]);

  const isLastVenue = index => index === displayVenues.length - 1;
  const scrollUp = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  const { isMedium } = useStdMediaQuery();

  useEffect(() => {
    const orderedVenues = orderBy(venues, [orderByTerm.value], [isAsc ? 'asc' : 'desc']);

    setDisplayVenues(orderedVenues?.slice(0, visibleVenues) || []);
  }, [venuesMeta, orderByTerm, isAsc, visibleVenues]); // eslint-disable-line

  useEffect(() => {
    if (!venuesMeta) setVisibleVenues(INITIAL_VENUES_COUNT);
  }, [venuesMeta]);

  return (
    <section className="container fav-section">
      <div className="fav-section__header">
        <h3>
          <FormattedMessage id="fav.title" />
        </h3>
        <div className="fav-section__controls">
          <SearchLocation className="fav-section__filter-item fav-section__filter-item--location" />
          <ToggleableFilter
            options={FILTER_VENUE_OPTIONS}
            dropdownClassname="fav-section__filter-item fav-section__filter-item--filter"
            toggleableClassname="fav-section__filter-item fav-section__filter-item--sort"
          />
        </div>
      </div>
      {venuesMeta?.success ? (
        <>
          {displayVenues.map((venue, index) => (
            <Fragment key={venue.id}>
              <VenueSection
                venue={venue}
                venueMeta={venuesMeta}
                scrollUp={isLastVenue(index) && scrollUp}
              />
              {!isLastVenue(index) && <Separator />}
            </Fragment>
          ))}
          {visibleVenues < venues?.length && (
            <Button onClick={showMoreVenues} primary outlined className="fav-section__load-more">
              <FormattedMessage id={isMedium ? 'fav.loadMore' : 'fav.loadMoreMobile'} />
            </Button>
          )}
        </>
      ) : (
        <VenueSectionSkeleton />
      )}
    </section>
  );
};

FindAVenue.propTypes = {
  geoVenues: array // eslint-disable-line
};

export default FindAVenue;
