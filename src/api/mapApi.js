import * as axios from 'axios';
import { COUNRY_INFO_BY_CURRENCY } from '@/constants';

const axiosTemplate = axios.create({
  baseURL: COUNRY_INFO_BY_CURRENCY,
  headers: {},
});

export const mapApi = {
  fetchCountryData(name) {
    return axiosTemplate.get(`name/${name}`).then((resp) => resp.data);
  },
  fetchCountryList() {
    return axiosTemplate.get().then((resp) => resp.data);
  },
};
