import { ILocalCurrency, IInputedValues } from '@/types/reducersTypes';
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
  return allCountry.reduce((acc: Array<string>, el: string) => {
    if (el.toUpperCase().startsWith(typedValue.toUpperCase())) {
      acc.push(el);
    }
    return acc;
  }, []);
};

export const filterCountryList = (countryList: Array<TCountryData>): Array<string> => {
  return countryList.reduce((acc: Array<string>, el: TCountryData) => {
    acc.push(el.name);
    return acc;
  }, []);
};

export const isCurrencyExist = (
  allRates: IRates,
  localCurrs: Array<ILocalCurrency>
): Array<IInputedValues> => {
  let result: Array<IInputedValues> = [];
  try {
    localCurrs.find((el: ILocalCurrency) => {
      if (allRates[el.code])
        result.push({ currency: el.code, value: allRates[el.code] });
    });
  } catch (e) {
    result = [];
  }
  return result;
};
