import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useIntl } from 'react-intl';

import useShowtime from 'components/showtime/useShowtime';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { DEFAULT_SEARCH_RADIUS, SECONDARY_SEARCH_RADIUS } from 'constants/constants';
import { setLocation } from 'state/actions/locationActions';

import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
import Loading from 'components/common/Loading/Loading';

import { usePrimaryModal } from 'hooks';
import useSelectTeather from './useSelectTheater';

import Theater from './Theather';

const labels = {
  loadMoreTheaters: { id: 'showtime.select_theater.load_more' },
  updateLocation: { id: 'showtime.select_theater.update_location' },
  updateLocationCta: { id: 'showtime.select_theater.update_location_cta' },
  distance: { id: 'showtime.select_theater.distance' },
  changeLocationTitle: { id: 'showtime.select_theater.location_change_title' },
  changeLocation: { id: 'showtime.select_theater.location_change' },
  saveLocation: { id: 'location.save' },
  cancel: { id: 'common.cancel' }
};

const TheaterSelector = () => {
  const dispatch = useDispatch();
  const [{ locality, region, lat, lng, id }, setModalInfo] = useState({
    locality: '',
    region: '',
    lat: null,
    lng: null,
    id: null
  });
  const {
    venuesToShow,
    searchRadius,
    setSearchRadius,
    search,
    setSearch,
    outOfLocationSearch,
    currentVenueId,
    wereTheatersRetrieved,
    selectVenue,
    focusLocation,
    ToggleableFilter
  } = useSelectTeather();
  const intl = useIntl();
  const { Modal, setIsOpen } = usePrimaryModal();
  const { nextStep } = useShowtime();
  const defaultRangeRadiusSet = searchRadius === DEFAULT_SEARCH_RADIUS;

  const handleSelectVenue = (id, { locality, region }, { latitude: lat, longitude: lng }) => {
    if (outOfLocationSearch) {
      setIsOpen(true);
      setModalInfo({ locality, region, lat, lng, id });
    } else {
      selectVenue(id);
    }
  };

  const handleSelectOutOfSearchTheater = () => {
    selectVenue(id);
    dispatch(setLocation({ lat, lng, location: `${locality}, ${region}` }));
    nextStep.onNextStep();
  };

  return (
    <div
      className={cn('theater-selector showtime-content-wrapper__inner', {
        'showtime-content--loading': !wereTheatersRetrieved && !outOfLocationSearch
      })}
    >
      <Modal
        title={intl.formatMessage(labels.changeLocationTitle)}
        description={intl.formatMessage(labels.changeLocation, { locality, region })}
        rightButtonLabel={intl.formatMessage(labels.saveLocation)}
        leftButtonLabel={intl.formatMessage(labels.cancel)}
        onRightButtonClick={handleSelectOutOfSearchTheater}
        onLeftButtonClick={() => setIsOpen(false)}
      />
      <div className="d-flex flex-shrink-0">
        <Input
          placeholder="Search"
          icon={<Search />}
          iconPlacement="left"
          onChange={e => setSearch(e.target.value)}
          value={search}
          overrides={{
            Wrapper: {
              className: 'theater-selector__input-wrapper'
            }
          }}
        />
        <ToggleableFilter dropdownClassname="theater-selector__filter" />
      </div>
      <div className="theater-selector__content">
        {wereTheatersRetrieved &&
          venuesToShow?.map(({ displayName, id, distance, address, location }) => (
            <Theater
              key={`theater-${id}`}
              id={id}
              currentId={currentVenueId}
              name={displayName}
              distance={intl.formatMessage(labels.distance, { distance })}
              onClick={handleSelectVenue}
              address={address}
              location={location}
            />
          ))}
        {!wereTheatersRetrieved && outOfLocationSearch && <Loading />}
        {defaultRangeRadiusSet && !search && (
          <Button
            onClick={() => setSearchRadius(SECONDARY_SEARCH_RADIUS)}
            className="theater-selector__load-more theater-selector__load-more--fix-width"
            outlined
            primary
          >
            {intl.formatMessage(labels.loadMoreTheaters)}
          </Button>
        )}
        {!defaultRangeRadiusSet && !search && (
          <button
            type="button"
            onClick={focusLocation}
            className="theater-selector__update-location-btn theater-selector__load-more body1"
          >
            <span>{intl.formatMessage(labels.updateLocation)}</span> <br />
            <span>{intl.formatMessage(labels.updateLocationCta)}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TheaterSelector;
