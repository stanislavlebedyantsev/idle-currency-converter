import * as axios from 'axios'

const axiosTemplate = axios.create({
  baseURL: 'https://api.ratesapi.io/api/',
  headers: {}
});

export const converterApi = {
  fetchCurrencyRate() {
    return axiosTemplate.get('latest').then(resp => resp.data);
  },
};
