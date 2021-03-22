import { IRates } from '@/types/apiResponces';

export type IInputedCurrenciesValues = {
  currency: string;
  value: number;
};
export interface ILocalCurrency {
  name: string;
  code: string;
  symbol: string;
  native: string;
  plural: string;
}

export interface IRateReducer {
  base: string;
  rates: IRates;
}


export interface IConverterState {
  allCurrencies: Array<string>;
  inputedValues: Array<IInputedCurrenciesValues>;
  localCurrency: ILocalCurrency;
  rate: IRateReducer;
}
