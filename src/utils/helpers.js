import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';

export const parseInputErrors = error => {
  if (!error) {
    return;
  }
  if (Array.isArray(error)) {
    return error[0];
  }
  return error;
};

export const applyQueryParams = (url, params = {}) => {
  if (isEmpty(params)) {
    return url;
  }
  const queryParams = queryString.stringify(params);
  return `${url}?${queryParams}`;
};

export const sortByDisplayRank = arrayToSort => sortBy(arrayToSort, 'displayRank');

export const truncateNumber = (number, digits = 2) => Number(number).toFixed(digits);
export const applyPercentage = (value, percentage) => (percentage / 100) * value;

export const sortAlphaNum = arr =>
  arr.sort((firstEl, secondEl) => {
    const regexLetter = /[^a-zA-Z]/g;
    const regexNumber = /[^0-9]/g;

    const firstValue = firstEl.replace(regexLetter, '');
    const secondValue = secondEl.replace(regexLetter, '');

    if (firstValue === secondValue) {
      const _firstValue = parseInt(firstEl.replace(regexNumber, ''), 10);
      const _secondValue = parseInt(secondEl.replace(regexNumber, ''), 10);

      if (_firstValue === _secondValue) return 0;

      return _firstValue > _secondValue ? 1 : -1;
    }

    return firstValue > secondValue ? 1 : -1;
  });

export const dollarTemplate = value => `$${value}`;

export const isFunction = func => typeof func === 'function';
