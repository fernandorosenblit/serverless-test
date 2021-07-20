import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'

import { initializeApi } from 'state/actions/apiActions'
import { locateClient, setLocation } from 'state/actions/locationActions'
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_LOCATION } from 'constants/constants'
import RouteFromPath from 'components/routes/RouteFromPath'
import routes from '../routes'
import { useSession } from 'hooks'

const App = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  dispatch(initializeApi(intl.locale))
  dispatch(locateClient())
  dispatch(setLocation({ lat: DEFAULT_LAT, lng: DEFAULT_LNG, location: DEFAULT_LOCATION }))
  const { authenticated } = useSession()

  return (
    <>
      <Helmet>
        <title>Hollywood.com - Best of Movies, TV, and Celebrities</title>
      </Helmet>
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => (
            <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
          ))}
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
