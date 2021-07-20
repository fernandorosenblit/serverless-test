import { useRef, useState } from 'react'
import build from 'redux-object'
import { useSelector } from 'react-redux'

import { setLocation } from 'state/actions/locationActions'
import queryBuilder from 'utils/queryBuilder'

// Hooks
import useApi from 'hooks/api/useApi'
import useDispatch from 'hooks/useDispatch'
import useGatewayLinks from 'hooks/selectors/useGatewayLinks'
import useMeta from 'hooks/selectors/useMeta'
import useThrottle from 'hooks/utils/useThrottle'

// Constants
import { SERVICES } from 'constants/serviceAccessors'
import { RELS } from 'constants/entityRels'
import { REDUX_BUILD_OPTIONS } from 'constants/constants'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const setLocationRequest = useDispatch(setLocation)
  const valueRef = useRef('')
  const { getReq } = useApi()

  const service = SERVICES.search
  const [serviceLink] = useGatewayLinks(service)

  const getQuery = () =>
    queryBuilder({
      search: {
        query: valueRef.current,
        type: RELS.search.geoLocation,
      },
      include: RELS.search.geoLocation,
      pagination: {
        number: 1,
        size: 10,
      },
    })

  const serviceMeta = useMeta(serviceLink, getQuery())
  const queryIds = serviceMeta?.data?.map(({ id }) => id) || null

  const throttledRequest = useThrottle(serviceLink => {
    if (serviceLink && !serviceMeta) getReq(serviceLink, getQuery())
  }, 1000)

  const serviceData = useSelector(({ api }) => build(api, service, queryIds, REDUX_BUILD_OPTIONS))

  const handleInputChange = value => {
    setSearchTerm(value)
    valueRef.current = value
    if (value.length > 2) throttledRequest(serviceLink)
  }

  const handleOptionClick = ({
    value: {
      location: { latitude: lat, longitude: lng },
      displayName,
      dummyUpdate,
    },
  }) => {
    !dummyUpdate && setLocationRequest({ lat, lng, location: displayName })
  }

  const toOption = ({ geoLocation }) => ({ label: geoLocation.displayName, value: geoLocation })

  const options = (serviceMeta && serviceMeta.success && serviceData?.map(toOption)) || []

  const isLoading = searchTerm.length > 2 && !serviceMeta?.success

  return {
    searchTerm,
    handleInputChange,
    handleOptionClick,
    options,
    isLoading,
  }
}
