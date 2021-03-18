import { ILocalCurrency, IInputedValues } from 'src/types/reducersTypes';
import { IRates } from 'src/types/apiResponces';

type TCountryData = {
  name: string;
};

export const filterBeforeSave = (
  allCountry: string[],
  typedValue: string
): string[] => {
  if (typedValue.length === 0) {
    return [];
  }
  return allCountry.reduce((acc: string[], el: string) => {
    if (el.toUpperCase().startsWith(typedValue.toUpperCase())) {
      acc.push(el);
    }
    return acc;
  }, []);
};

export const filterCountryList = (countryList: TCountryData[]): string[] => {
  return countryList.reduce((acc: string[], el: TCountryData) => {
    acc.push(el.name);
    return acc;
  }, []);
};

export const isCurrencyExist = (
  allRates: IRates,
  localCurrs: ILocalCurrency[]
): IInputedValues[] => {
  let result: IInputedValues[] = [];
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
