import { SERVICES } from 'constants/serviceAccessors'
import useGetService from 'hooks/api/useGetService'

export default () => useGetService(SERVICES.ratingType)()
