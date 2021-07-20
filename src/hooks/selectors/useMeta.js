import { useSelector } from 'react-redux';

export default (endpoint, query = null) => {
  return query
    ? useSelector(({ api }) => api.meta?.[endpoint]?.[query])
    : useSelector(({ api }) => api.meta?.[endpoint]);
};
