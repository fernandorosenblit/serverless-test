import { createAction } from '@rootstrap/redux-tools';

export const addFilter = createAction('FILTERS_ADD');
export const removeFilter = createAction('FILTERS_REMOVE');
export const clearFilters = createAction('FILTERS_CLEAR');
