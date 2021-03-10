import * as axios from 'axios';
import { GEOLOCATION_API_BASE, GEOLOCATION_API_KEY } from '@/constants';

const axiosTemplate = axios.create({
  headers: {},
});

export const geolocationApi = {
  fetchGeolocation() {
    return axiosTemplate
      .get(`${GEOLOCATION_API_BASE}${GEOLOCATION_API_KEY}`)
      .then((resp) => resp.data);
  },
};
