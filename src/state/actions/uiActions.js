import { createAction } from '@rootstrap/redux-tools';

// SNACKBAR
export const showSnackbar = createAction('SNACKBAR_ADD');
export const clearSnackbar = createAction('SNACKBAR_CLEAR');

// MOVIE DETAILS MODAL
export const switchMovieDetailsModal = createAction('SWITCH_MOVIE_DETAILS_MODAL');
