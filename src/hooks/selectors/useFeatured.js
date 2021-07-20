import { HOME_CAROUSEL_NAME } from 'constants/entityNames'
import { RELS } from 'constants/entityRels'
import { SERVICES } from 'constants/serviceAccessors'
import useGetService from 'hooks/api/useGetService'
import queryBuilder from 'utils/queryBuilder'

const { featuredList: featuredListRel, featuredListItem, action } = RELS

export default (queryObj = {}) => {
  const featuredListQuery = queryBuilder({
    include: {
      [featuredListRel.items]: [
        featuredListItem.imageContent,
        { [featuredListItem.actions]: action.items },
      ],
    },
  })

  const [featuredList] = useGetService(SERVICES.featureList)(featuredListQuery)

  const cmsMovieRefs = featuredList?.find(({ name }) => name === HOME_CAROUSEL_NAME)?.[
    featuredListRel.items
  ]

  const cmsMovies = cmsMovieRefs?.reduce(
    (acum, { actions: [action], imageContent }) => [
      ...acum,
      ...action.items.map(({ value }) => ({ id: value, imageContent })),
    ],
    [],
  )

  const featuredMoviesQuery = queryBuilder({
    ...queryObj,
    filter: {
      id: {
        in: cmsMovies?.map(({ id }) => id) || [],
      },
    },
  })

  const [featuredMoviesResponse, featuredMoviesMeta] = useGetService(SERVICES.movie)(
    featuredMoviesQuery,
    {
      enableRequest: !!cmsMovies,
    },
  )

  // Merge featured images into movies
  const featuredMovies = featuredMoviesResponse?.map(movie => {
    if (cmsMovies) {
      const { imageContent: featuredImageContent } =
        cmsMovies.find(({ id }) => id === movie.id) || {}

      return { ...movie, featuredImageContent }
    }
    return movie
  })

  return [featuredMovies, featuredMoviesMeta]
}
