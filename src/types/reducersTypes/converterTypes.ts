import { IRates } from '@/types/apiResponces';

export type IInputedValues = {
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
  allCurrs: Array<string>;
  inputedValues: Array<IInputedValues>;
  localCurrency: ILocalCurrency;
  rate: IRateReducer;
}
