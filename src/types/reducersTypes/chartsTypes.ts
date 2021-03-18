import { IRates } from 'src/types/apiResponces';

export interface IMappedRates {
  BYN: number;
  RUB: number;
  USD: number;
  currency: string;
  date: number;
  name: string;
}

export interface IRatesHistory extends IRates {
  date: number;
}

export interface IChartsState {
  ratesHistory: IRatesHistory[];
  selectedCheckboxesCurrencies: string[];
  mappedRates: IMappedRates[];
  selectedForTheChart: string;
}