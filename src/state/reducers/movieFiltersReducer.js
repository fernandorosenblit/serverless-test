import { createReducer } from '@rootstrap/redux-tools'
import { addFilter, removeFilter, clearFilters } from 'state/actions/movieFiltersActions'

const initialState = {
  rating: [],
  genre: [],
  count: 0,
}

const actionHandlers = {
  [addFilter]: (state, { payload: { type, id } }) => {
    state[type] = [...state[type], id]
    state.count += 1
  },
  [removeFilter]: (state, { payload: { type, id } }) => {
    state[type] = state[type].filter(item => item !== id)
    state.count -= 1
  },
  [clearFilters]: () => initialState,
}

export default createReducer(initialState, actionHandlers)
