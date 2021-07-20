import { useDispatch } from 'react-redux';

import { getApi, postApi, patchApi, putApi, deleteApi } from 'state/actions/apiActions';

export default () => {
  const dispatch = useDispatch();

  const dispatchApiAction = action => (endpoint, query = '', options = {}) => {
    if (!query) query = '';
    return dispatch(action(`${endpoint}${query}`, options));
  };

  const getReq = dispatchApiAction(getApi);
  const postReq = dispatchApiAction(postApi);
  const patchReq = dispatchApiAction(patchApi);
  const putReq = dispatchApiAction(putApi);
  const deleteReq = dispatchApiAction(deleteApi);

  return {
    getReq,
    postReq,
    patchReq,
    putReq,
    deleteReq
  };
};
