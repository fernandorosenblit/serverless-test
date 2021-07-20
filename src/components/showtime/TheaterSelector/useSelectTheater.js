import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';

import { calculateDistance } from 'utils/haversine';
import queryBuilder from 'utils/queryBuilder';
import { useToggleableFilter, useGetService } from 'hooks';
import { SERVICES } from 'constants/serviceAccessors';
import { RELS } from 'constants/entityRels';
import { FILTER_VENUE_OPTIONS, DEFAULT_SEARCH_RADIUS, LOCATION_ID } from 'constants/constants';
import { setVenueId } from 'state/actions/showtimeActions';

export default () => {
  const dispatch = useDispatch();
  const [geoLocatedVenus, setGeoLocatedVenues] = useState();
  const [venuesToShow, setVenuesToShow] = useState();
  const [coordinates, setCoordinates] = useState({});
  const [searchRadius, setSearchRadius] = useState(DEFAULT_SEARCH_RADIUS);
  const [search, setSearch] = useState('');
  const [outOfLocationSearch, setOutOfLocationSearch] = useState('');
  const [currentVenueId, setCurrentVenueId] = useState();
  const { movieId, lat, lng } = useSelector(
    ({ showtime: { movieId }, location: { lat, lng } }) => ({
      movieId,
      lat,
      lng
    })
  );
  const { ToggleableFilter, isAsc, orderByTerm } = useToggleableFilter(FILTER_VENUE_OPTIONS);

  const geoQueryOptions = {
    include: RELS.geoVenueSearch.venue,
    geoSearch: {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      minRadius: searchRadius === DEFAULT_SEARCH_RADIUS ? null : DEFAULT_SEARCH_RADIUS,
      maxRadius: searchRadius
    }
  };

  if (!outOfLocationSearch) {
    geoQueryOptions.geoSearch.minRadius =
      searchRadius === DEFAULT_SEARCH_RADIUS ? null : DEFAULT_SEARCH_RADIUS;
    geoQueryOptions.geoSearch.maxRadius = searchRadius;
  }

  const geoQuery = queryBuilder(geoQueryOptions);

  const [nearVenuesList, nearVenuesMeta] = useGetService(SERVICES.geoVenueSearch)(geoQuery, {
    enableRequest: !!movieId && coordinates.lat && coordinates.lng && !outOfLocationSearch,
    refreshStore: false
  });

  const wereNearVenuesRetrieved = nearVenuesMeta && !nearVenuesMeta.loading;

  const venueQueryOptions = {
    filter: {
      any: `events, movie.id eq ${movieId}`
    }
  };

  if (outOfLocationSearch) {
    venueQueryOptions.filter.startswith = `displayName, '${outOfLocationSearch}'`;
    delete venueQueryOptions.filter.id;
  } else {
    venueQueryOptions.filter.id = {
      in: nearVenuesList?.map(venue => venue.id)
    };
    delete venueQueryOptions.filter.startswith;
  }

  const venueQuery = queryBuilder(venueQueryOptions);

  const [venueList, venueMeta] = useGetService(SERVICES.venue)(venueQuery, {
    enableRequest: !!movieId && wereNearVenuesRetrieved,
    debounceQuery: true,
    refreshStore: false
  });

  const wereTheatersRetrieved = venueMeta && !venueMeta.loading;

  useMemo(() => {
    venueList?.forEach(venue => {
      const { latitude, longitude } = venue.location;
      venue.distance = Number(calculateDistance([lng, lat], [longitude, latitude]));
    });
  }, [venueList]);

  const selectVenue = useCallback(
    id => {
      dispatch(setVenueId(id));
      setCurrentVenueId(id);
    },
    [dispatch]
  );

  const focusLocation = () => {
    const location = document.getElementById(LOCATION_ID);
    location.focus();
    location.click();
  };

  useEffect(() => {
    setSearchRadius(DEFAULT_SEARCH_RADIUS);
    setCoordinates({ lat, lng });
  }, [lat, lng]);

  useEffect(() => {
    !outOfLocationSearch && venueMeta?.success && setGeoLocatedVenues(venueList);
  }, [venueMeta?.success]);

  useEffect(() => {
    let orderedVenues = [];
    orderedVenues = geoLocatedVenus?.filter(({ displayName }) =>
      displayName.toLowerCase().includes(search.toLowerCase())
    );

    if (isEmpty(orderedVenues)) {
      setOutOfLocationSearch(search);
      orderedVenues = orderBy(venueList, orderByTerm.value, [isAsc ? 'asc' : 'desc']);
      setVenuesToShow(orderedVenues);
    } else {
      orderedVenues = orderBy(orderedVenues, orderByTerm.value, [isAsc ? 'asc' : 'desc']);
      setVenuesToShow(orderedVenues);
      setOutOfLocationSearch('');
    }
  }, [venueMeta?.success, orderByTerm, isAsc, search, geoLocatedVenus, venueList?.length]); // eslint-disable-line

  return {
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
  };
};
