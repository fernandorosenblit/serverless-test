import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import build from 'redux-object'

import useApi from 'hooks/api/useApi'
import useMeta from 'hooks/selectors/useMeta'
import useGatewayLinks from 'hooks/selectors/useGatewayLinks'

import { REDUX_BUILD_OPTIONS } from 'constants/constants'

export default service => ({ data = {}, enableRequest = true, link }) => {
  const { postReq } = useApi()

  const [serviceLink] = useGatewayLinks(service)
  const actualLink = link ?? serviceLink

  const serviceMeta = useMeta(actualLink)

  const queryIds =
    serviceMeta?.data?.map(({ id }) => id) || serviceMeta?.['']?.data?.map(({ id }) => id) || null
  const serviceData = useSelector(({ api }) => build(api, service, queryIds, REDUX_BUILD_OPTIONS))

  useEffect(() => {
    enableRequest && postReq(actualLink, null, data)
  }, [enableRequest, serviceLink, link]) //eslint-disable-line

  return [serviceData, serviceMeta]
}
