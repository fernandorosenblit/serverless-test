import axios from 'axios'
import { IPIFY_URL } from 'constants/constants'

class LocationService {
  static getLocation() {
    return axios.get(IPIFY_URL)
  }
}

export default LocationService
