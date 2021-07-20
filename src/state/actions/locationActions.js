import { createAction, createThunk } from '@rootstrap/redux-tools'
import locationService from 'services/locationService'

export const locateClient = createThunk('LOCATE_CLIENT', async () => {
  try {
    const { data } = await locationService.getLocation()
    return data
  } catch (error) {
    console.error(error)
  }
})

export const setLocation = createAction('SET_LOCATION')
