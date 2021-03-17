import { IRates } from 'src/types/apiResponces';

type IInputedValues = {
  currency: string;
  value: number;
};
type ILocalCurrency = {
  name: string;
  code: string;
  symbol: string;
  native: string;
  plural: string;
};

type IRate = {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: IRates;
};

export interface IConverterState {
  allCurrs: string[];
  inputedValues: IInputedValues[];
  localCurrency: ILocalCurrency;
  rate: IRate;
}

type IMappedRates = {
  BYN: number;
  RUB: number;
  USD: number;
  currency: string;
  date: number;
  name: string;
};

interface IRatesHistory extends IRates {
	date: number;
}

export interface IChartsState {
  ratesHistory: any;
  selectedCheckboxesCurrencies: string[];
  mappedRates: IMappedRates[];
  selectedForTheChart: string;
}
export interface IMapState {
  matchedValues: string[];
  countryList: string[];
  countryData: IRatesHistory; 
}

export interface IErrorState {
  error: string;
  isError: boolean;
}
export interface IUserState {
  user: any; //?????????????????
  isAuth: boolean;
  isExist: boolean;
}

export interface IRootState {
  converter: IConverterState;
  charts: IChartsState;
  map: IMapState;
  error: IErrorState;
  user: IUserState;
}

export type TAction = {
  type: string;
  payload: any;
};
