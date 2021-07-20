import { SERVICES } from 'constants/serviceAccessors'
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_SEARCH_RADIUS } from 'constants/constants'
import useGetService from 'hooks/api/useGetService'
import queryBuilder from 'utils/queryBuilder'
import { RELS } from 'constants/entityRels'
import { useSelector } from 'react-redux'

export default () => {
  const { ip, lat, lng } = useSelector(({ location }) => location)

  const geoLocationSearchQuery = queryBuilder({
    geoSearch: {
      ip,
      maxRadius: DEFAULT_SEARCH_RADIUS,
    },
    include: RELS.geoLocationSearch.geoLocation,
  })

  const getLocationSearchEnabled = ip && (!lat && !lng)

  const [locationData, locationDataMeta] = useGetService(SERVICES.geoLocationSearch)(
    geoLocationSearchQuery,
    {
      enableRequest: getLocationSearchEnabled,
    },
  )

  const geoVenueSearchEnabled = (lat && lng) || (locationDataMeta && locationDataMeta.success)

  const [closestLocation] = locationData?.sort((a, b) => a.distance - b.distance) || []
  const { latitude: ipLat, longitude: ipLng } = closestLocation?.geoLocation?.location || {}

  const latitude = lat || ipLat || DEFAULT_LAT
  const longitude = lng || ipLng || DEFAULT_LNG

  const geoVenueSearchQuery = queryBuilder({
    geoSearch: {
      latitude,
      longitude,
      maxRadius: DEFAULT_SEARCH_RADIUS,
    },
  })

  return useGetService(SERVICES.geoVenueSearch)(geoVenueSearchQuery, {
    enableRequest: geoVenueSearchEnabled,
  })
}
