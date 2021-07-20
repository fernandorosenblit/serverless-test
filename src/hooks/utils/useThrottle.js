import { useCallback } from 'react';
import { debounce } from 'lodash';

export default (fn, delay) => useCallback(debounce(fn, delay), []);
