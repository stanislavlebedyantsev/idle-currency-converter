import axios from 'axios';
import { COUNRY_INFO_BY_CURRENCY } from '@/constants';
import { ICountryData } from '@/types/reducersTypes';
import { IResponce } from '@/types/apiResponces';

const axiosTemplate = axios.create({
  baseURL: COUNRY_INFO_BY_CURRENCY,
  headers: {},
});

export const mapsApi = {
  fetchCountryData(name: string): Promise<ICountryData> {
    return axiosTemplate
      .get(`name/${name}`)
      .then((responce: IResponce<ICountryData>) => responce.data);
  },
  fetchCountryList(): Promise<Array<string>> {
    return axiosTemplate
      .get('')
      .then((responce: IResponce<Array<string>>) => responce.data);
  },
};
