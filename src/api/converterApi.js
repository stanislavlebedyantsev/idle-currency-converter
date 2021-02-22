import * as axios from 'axios'
import {CONVERTER_API_BASE} from '@/constants'

const axiosTemplate = axios.create({
  baseURL: CONVERTER_API_BASE,
  headers: {}
});

export const converterApi = {
  fetchCurrencyRate() {
    return axiosTemplate.get('latest').then(resp => resp.data);
  },
};
