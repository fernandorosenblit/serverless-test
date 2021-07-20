import { createSelector } from 'reselect'
import { CATEGORIES } from 'constants/findAMovie'

export const getMoviesByReleaseStatus = createSelector(
  state => state.api.movie && Object.values(state.api.movie),
  state => state.api.releaseStatus,
  (_, props) => props.replaceAll('_', '-'),
  (movies, releaseStatusList, releaseStatus) => {
    if (movies && releaseStatusList) {
      const statusId = Object.values(releaseStatusList).find(
        status => status.attributes.name === releaseStatus,
      )?.id

      return movies.filter(
        movie => movie.relationships.releaseStatus.data?.id === statusId?.toString(),
      )
    }
  },
)

export const getMoviesByOnSaleDate = createSelector(
  state => state.api.movie && Object.values(state.api.movie),
  (_, props) => props,
  (movies, category) => {
    if (movies) {
      const now = Date.now()

      return movies.filter(({ attributes: { onSaleDateUtc } }) => {
        if (onSaleDateUtc) {
          if (category === CATEGORIES.onSale) {
            return Date.parse(onSaleDateUtc) <= now
          }

          if (category === CATEGORIES.comingSoon) {
            return Date.parse(onSaleDateUtc) > now
          }
        }
        return false
      })
    }
  },
)
