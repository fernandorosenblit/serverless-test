import { createReducer } from '@rootstrap/redux-tools'
import { locateClient, setLocation } from 'state/actions/locationActions'

const initialState = {
  ip: null,
  lat: null,
  lng: null,
  location: null,
}

const actionHandlers = {
  [locateClient.success]: (state, { payload: { ip } }) => {
    state.ip = ip
  },
  [setLocation]: (state, { payload: { lat, lng, location } }) => {
    state.lat = lat
    state.lng = lng
    state.location = location
  },
}

export default createReducer(initialState, actionHandlers)
