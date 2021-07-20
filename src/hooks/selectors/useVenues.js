import { isEmpty } from 'lodash'
import useGetService from '../api/useGetService'

import { SERVICES } from 'constants/serviceAccessors'
import queryBuilder from 'utils/queryBuilder'
import { RELS } from 'constants/entityRels'

export default geoVenues => {
  const venuesIds = geoVenues?.map(({ id }) => +id) || []

  const query = queryBuilder({
    include: {
      [RELS.venue.eventSchedules]: { [RELS.eventSchedule.movie]: RELS.movie.imageContent },
    },
    filter: {
      id: {
        in: venuesIds,
      },
      any: RELS.venue.eventSchedules,
    },
  })

  const [venuesResponse, venuesMeta] = useGetService(SERVICES.venue)(query, {
    enableRequest: !!venuesIds && !isEmpty(venuesIds),
  })

  const venues = venuesResponse?.map(venue => ({
    ...venue,
    ...geoVenues.find(({ id }) => id === venue.id),
  }))

  return [venues, venuesMeta]
}
