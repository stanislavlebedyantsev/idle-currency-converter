import axios from 'axios';
import { CONVERTER_API_BASE, CONVERTER_API_KEY } from '@/constants';
import { IRateReducer } from '@/types/reducersTypes';
import { IResponce } from '@/types/apiResponces';


const axiosTemplate = axios.create({
  baseURL: CONVERTER_API_BASE,
  headers: {},
});

export const converterApi = {
  fetchCurrencyRate(): Promise<IRateReducer> {
    return axiosTemplate
      .get(`latest.json?app_id=${CONVERTER_API_KEY}`)
      .then((responce: IResponce<IRateReducer>) => responce.data);
  },
};
