import { ENTER_KEY } from 'constants/constants'
import { isFunction } from './helpers'

export default func => event => {
  if (event.key === ENTER_KEY) isFunction(func) && func(event)
}
