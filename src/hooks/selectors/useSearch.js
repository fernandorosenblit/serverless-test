import queryBuilder from 'utils/queryBuilder'
import useGetService from 'hooks/api/useGetService'

import { SERVICES } from 'constants/serviceAccessors'
import { RELS } from 'constants/entityRels'

const performSearch = criteria => {
  return criteria.text && criteria.text.length > 2
}

export default searchCriteria => {
  const query = queryBuilder({
    search: {
      query: searchCriteria.text,
    },
    include: [
      RELS.search.venue,
      RELS.search.geoLocation,
      {
        [RELS.search.movie]: [RELS.movie.imageContent, RELS.movie.textContent],
      },
    ],
  })

  return useGetService(SERVICES.search)(query, {
    enableRequest: performSearch(searchCriteria),
    debounceQuery: true,
  })
}
