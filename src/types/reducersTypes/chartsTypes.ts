import { IRates } from '@/types/apiResponces';

export interface IMappedRates {
	[key: string]: number | string
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
  selectedCurrencies: string;
  mappedRates: Array<IMappedRates>;
}
