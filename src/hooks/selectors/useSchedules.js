import { RELS } from 'constants/entityRels'
import { SERVICES } from 'constants/serviceAccessors'
import useGetService from 'hooks/api/useGetService'
import queryBuilder from 'utils/queryBuilder'

export default ({ venues, venuesMeta }) => {
  const venuesIds = venues?.map(venue => +venue.id) || []

  const eventScheduleQuery = queryBuilder({
    filter: {
      'venue.id': { in: venuesIds },
    },
    include: [
      { [RELS.eventSchedule.movie]: [RELS.movie.imageContent, RELS.movie.releaseStatus] },
      [RELS.eventSchedule.venue],
    ],
  })

  return useGetService(SERVICES.eventSchedule)(eventScheduleQuery, {
    enableRequest: venuesMeta && venuesMeta.success,
  })
}
