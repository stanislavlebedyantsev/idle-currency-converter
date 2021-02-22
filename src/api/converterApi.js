import * as axios from 'axios'
import {CONVERTER_API_BASE, CONVERTER_API_KEY} from '@/constants'

const axiosTemplate = axios.create({
  baseURL: CONVERTER_API_BASE,
  headers: {}
});

export const converterApi = {
  fetchCurrencyRate(base) {
    return axiosTemplate.get(`latest?access_key=${CONVERTER_API_KEY}&base=${base}`)
    .then(resp => resp.data);
  },
};
