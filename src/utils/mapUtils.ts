import {
  ILocalCurrency,
  IInputedCurrenciesValues,
} from '@/types/reducersTypes';
import { IRates } from '@/types/apiResponces';

export type TCountryData = {
  name: string;
};

export const filterBeforeSave = (
  allCountry: Array<string>,
  typedValue: string
): Array<string> => {
  if (typedValue.length === 0) {
    return [];
  }
  return allCountry.reduce((acc: Array<string>, element: string) => {
    if (element.toUpperCase().startsWith(typedValue.toUpperCase())) {
      acc.push(element);
    }
    return acc;
  }, []);
};

export const filterCountryList = (
  countryList: Array<TCountryData>
): Array<string> => {
  return countryList.reduce((acc: Array<string>, element: TCountryData) => {
    acc.push(element.name);
    return acc;
  }, []);
};

export const isCurrencyExist = (
  allRates: IRates,
  localCurrs: Array<ILocalCurrency>
): Array<IInputedCurrenciesValues> => {
  let result: Array<IInputedCurrenciesValues> = [];
  try {
    localCurrs.find((element: ILocalCurrency) => {
      if (allRates[element.code])
        result.push({ currency: element.code, value: allRates[element.code] });
    });
  } catch (e) {
    result = [];
  }
  return result;
};
