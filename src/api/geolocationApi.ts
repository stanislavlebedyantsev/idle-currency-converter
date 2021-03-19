import axios from 'axios';
import { GEOLOCATION_API_BASE, GEOLOCATION_API_KEY } from '@/constants';
import { ILocalCurrency } from '@/types/reducersTypes';
import { IResponce } from '@/types/apiResponces';

const axiosTemplate = axios.create({
  headers: {},
});

export const geolocationApi = {
  fetchGeolocation(): Promise<ILocalCurrency> {
    return axiosTemplate
      .get(`${GEOLOCATION_API_BASE}${GEOLOCATION_API_KEY}`)
      .then((resp: IResponce<ILocalCurrency>) => resp.data);
  },
};
