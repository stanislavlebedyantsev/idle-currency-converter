import { LatLngExpression } from 'leaflet';
import { ILocalCurrency } from './converterTypes';

export interface ICountryData {
  name: string;
  latlng: LatLngExpression ;
  population: number;
  capital: string;
  currencies: Array<ILocalCurrency>;
}

export interface IMapState {
  matchedValues: Array<string>;
  countryList: Array<string>;
  countryData: ICountryData;
}
