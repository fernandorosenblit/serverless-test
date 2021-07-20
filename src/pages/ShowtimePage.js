import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import match from 'conditional-expression'

import { SHOWTIME_STEPS } from 'constants/showtime'
import { SERVICES } from 'constants/serviceAccessors'
import { RELS } from 'constants/entityRels'

import { initShowtime, resetShowtimeReducer } from 'state/actions/showtimeActions'
import { useGetService } from 'hooks'
import queryBuilder from 'utils/queryBuilder'

import ShowtimeContent from 'components/showtime/ShowtimeContent/ShowtimeContent'
import TheaterSelector from 'components/showtime/TheaterSelector/TheaterSelector'
import DateShowtimeSelector from 'components/showtime/DateShowtimeSelector/DateShowtimeSelector'
import SeatSelector from 'components/showtime/SeatSelector/SeatSelector'
import TicketSelector from 'components/showtime/TicketSelector/TicketSelector'
import Checkout from 'components/showtime/Checkout/Checkout'
import Stepper from 'components/showtime/Stepper/Stepper'
import useShowtime from 'components/showtime/useShowtime'

const ShowtimePage = () => {
  const dispatch = useDispatch()
  const { movieUrlName, venueUrlName } = useParams()
  const { currentStep } = useShowtime()
  const enableMovieRequest = !!movieUrlName
  const enableVenueRequest = !!venueUrlName

  const movieQuery = queryBuilder({
    filter: {
      urlName: { eq: movieUrlName },
    },
    include: [
      RELS.movie.imageContent,
      { [RELS.movie.ratings]: RELS.movieRating.ratingType },
      RELS.movie.textContent,
      RELS.movie.genres,
    ],
  })

  const [movieRequest, movieRequestData] = useGetService(SERVICES.movie)(movieQuery, {
    enableRequest: enableMovieRequest,
  })

  const venueQuery = queryBuilder({
    filter: {
      urlName: { eq: venueUrlName },
    },
    include: [RELS.venue.imageContent],
  })

  const [venueRequest, venueRequestData] = useGetService(SERVICES.venue)(venueQuery, {
    enableRequest: enableVenueRequest,
  })

  const movieRequestSuccess = movieRequestData?.success
  const movieId = movieRequestSuccess && movieRequest && movieRequest[0].id
  const venueRequestSuccess = venueRequestData?.success
  const venueId = venueRequestSuccess && venueRequest && venueRequest[0].id

  const isLoading = !movieRequestSuccess || (enableVenueRequest && !venueRequestSuccess)
  const isBadUrl = (movieRequestSuccess && !movieId) || (venueRequestSuccess && !venueId)

  useEffect(() => {
    movieRequestSuccess && !venueRequestSuccess
      ? dispatch(initShowtime({ movieId }))
      : dispatch(initShowtime({ movieId, venueId }))
  }, [dispatch, movieRequestSuccess, venueRequestSuccess, movieId, venueId])

  useEffect(() => {
    return () => dispatch(resetShowtimeReducer())
  }, [dispatch])

  // TODO: Add loading and error UI.
  if (isBadUrl || isLoading) {
    return null
  }

  return (
    <div>
      <Stepper currentStep={currentStep} />
      <ShowtimeContent currentStep={currentStep}>
        {match(currentStep)
          .equals(SHOWTIME_STEPS.dateShowtimeSelection)
          .then(<DateShowtimeSelector />)
          .equals(SHOWTIME_STEPS.ticketSelection)
          .then(<TicketSelector />)
          .equals(SHOWTIME_STEPS.seatSelection)
          .then(<SeatSelector />)
          .equals(SHOWTIME_STEPS.checkout)
          .then(<Checkout />)
          .else(<TheaterSelector />)}
      </ShowtimeContent>
    </div>
  )
}

export default ShowtimePage
