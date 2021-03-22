import { IRates } from '@/types/apiResponces';

export interface IMappedRates {
  BYN: number;
  RUB: number;
  USD: number;
  currency: string;
  date: number;
  name: string;
}

export interface IRatesHistory {
  date: number;
  rates: IRates;
}

export interface IChartsState {
  ratesHistory: Array<IRatesHistory>;
  selectedCurrencies: Array<string>;
  mappedRates: Array<IMappedRates>;
}
