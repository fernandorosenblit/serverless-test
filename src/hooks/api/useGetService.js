import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import build from 'redux-object'

import useThrottle from 'hooks/utils/useThrottle'
import useApi from 'hooks/api/useApi'
import useMeta from 'hooks/selectors/useMeta'
import useGatewayLinks from 'hooks/selectors/useGatewayLinks'

import { REDUX_BUILD_OPTIONS } from 'constants/constants'

const defaultOptions = {
  selectIds: null,
  enableRequest: true,
  refreshStore: true,
  debounceQuery: false,
}

export default service => (query = null, options = defaultOptions) => {
  const { selectIds, enableRequest, refreshStore, debounceQuery, link } = {
    ...defaultOptions,
    ...options,
  }
  const [serviceLink] = useGatewayLinks(service)
  const actualLink = link ?? serviceLink

  const { getReq } = useApi()
  const debouncedRequest = useThrottle((actualLink, query) => getReq(actualLink, query), 300)

  const serviceMeta = useMeta(actualLink, query)

  // Data attribute can be an array of objects or a single object. For the object case json-api-normalizer creates an empty string key.
  const queryIds =
    serviceMeta?.data?.map(({ id }) => id) || serviceMeta?.['']?.data?.map(({ id }) => id) || null

  const serviceData = useSelector(({ api }) =>
    build(api, service, selectIds || queryIds, REDUX_BUILD_OPTIONS),
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  const queryToPerform = useMemo(() => (debounceQuery ? debouncedRequest : getReq), [debounceQuery])
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    let shouldSendRequest = true
    if (serviceMeta && !refreshStore) shouldSendRequest = false
    if (!actualLink) shouldSendRequest = false
    if (!enableRequest) shouldSendRequest = false

    if (shouldSendRequest) queryToPerform(actualLink, query)
  }, [actualLink, enableRequest, refreshStore, query]) // eslint-disable-line

  return [enableRequest ? serviceData : undefined, serviceMeta]
}
