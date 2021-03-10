import * as axios from 'axios';
import { CONVERTER_API_BASE, CONVERTER_API_KEY } from '@/constants';

const axiosTemplate = axios.create({
  baseURL: CONVERTER_API_BASE,
  headers: {},
});

export const converterApi = {
  fetchCurrencyRate() {
    return axiosTemplate
      .get(`latest.json?app_id=${CONVERTER_API_KEY}`)
      .then((resp) => resp.data);
  },
};
