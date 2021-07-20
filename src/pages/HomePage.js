import React from 'react'
import { useSelector } from 'react-redux'

import useGeoSearch from 'hooks/selectors/useGeoSearch'
import useSchedules from 'hooks/selectors/useSchedules'

import Concierge from 'components/home/Concierge/Concierge'
import Featured from 'components/home/Featured/Featured'
import FindAMovie from 'components/home/FindAMovie/FindAMovie'
import FindAMovieFilters from 'components/home/FindAMovieFilters/FindAMovieFilters'
import Separator from 'components/common/Separator/Separator'
import FindAVenue from 'components/home/FindAVenue/FindAVenue'

const HomePage = () => {
  const { ip } = useSelector(({ location: { ip } }) => ({ ip }))
  const [venues, venuesMeta] = useGeoSearch({ ip })
  const [, schedulesMeta] = useSchedules({ venues, venuesMeta })

  return (
    <div>
      <Featured />
      <Concierge />

      <Separator />
      <FindAMovie meta={schedulesMeta} />
      <FindAMovieFilters />

      <Separator />
      <FindAVenue geoVenues={venues} />
    </div>
  )
}

export default HomePage
