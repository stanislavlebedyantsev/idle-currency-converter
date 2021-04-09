import moment from 'moment';
import { IRates } from '@/types/apiResponces';
import {
  calculateCurrencyFromBase,
  calculateBaseValueFromCurrency,
} from '@/utils';
import {
  IRatesHistory,
  IMappedRates,
  IInputedCurrenciesValues,
} from '@/types/reducersTypes';

export const chartsUploadMapper = (rates: IRates): IRatesHistory => {
  const uploadTime = moment().valueOf();
  const uploadData = {
    date: uploadTime,
    rates: rates,
  };
  return uploadData;
};

export const checkLastUpload = (lastUploadeData: number): boolean => {
  const SIX_HOUR_IN_MILLISECONDS = 21600000;
  const now = moment().valueOf();
  if (moment(now).diff(lastUploadeData) >= SIX_HOUR_IN_MILLISECONDS) {
    return true;
  }
  return false;
};

export const predisplayedChartsMapper = (
  selectedCurrency: Array<IInputedCurrenciesValues>,
  chartsData: Array<IRatesHistory>
): Array<IMappedRates> => {
  const existedValues = selectedCurrency.reduce(
    (acc: Array<string>, element: IInputedCurrenciesValues) => {
      acc.push(element.currency.substring(0, 3));
      return acc;
    },
    []
  );
  return chartsData.reduce(
    (acc: Array<IMappedRates>, element: IRatesHistory) => {
      const temp: IMappedRates = existedValues.reduce(
        (acc: IMappedRates, el: string) => {
          acc[el.substring(0, 3)] = element.rates[el.substring(0, 3)];
          return acc;
        },
        { currency: 'USD', date: element.date, name: 'USD' }
      );
      acc.push(temp);
      return acc;
    },
    []
  );
};
