import { createReducer } from '@rootstrap/redux-tools'
import { clearSnackbar, showSnackbar, switchMovieDetailsModal } from 'state/actions/uiActions'

const initialState = {
  snackbar: {
    isOpen: false,
    snackbars: [],
  },
  movieDetailsModal: {
    isOpen: false,
    movieId: null,
  },
}

const actionHandlers = {
  [showSnackbar]: (state, { payload: { message, actionLegend, action } }) => {
    state.snackbar.isOpen = true
    state.snackbar.snackbars = [
      ...state.snackbar.snackbars,
      {
        message,
        actionLegend,
        action,
      },
    ]
  },
  [clearSnackbar]: state => {
    state.snackbar = initialState.snackbar
  },
  [switchMovieDetailsModal]: (state, { payload: { isOpen, movieId } }) => {
    state.movieDetailsModal.isOpen = isOpen
    state.movieDetailsModal.movieId = movieId
  },
}

export default createReducer(initialState, actionHandlers)
