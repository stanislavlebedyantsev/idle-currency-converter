import moment from 'moment';
import { IRates } from '@/types/apiResponces';
import {
  calculateCurrencyFromBase,
  calculateBaseValueFromCurrency,
} from '@/utils';
import { IRatesHistory, IMappedRates } from '@/types/reducersTypes';

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
  selectedCurrency: string,
  chartsData: Array<IRatesHistory>
): Array<IMappedRates> => {
  return chartsData.reduce((acc: Array<IMappedRates>, el: IRatesHistory) => {
    const temp: IMappedRates = {
      BYN: calculateCurrencyFromBase(
        1 / el.rates[selectedCurrency],
        el.rates['BYN']
      ),
      RUB: calculateCurrencyFromBase(
        1 / el.rates[selectedCurrency],
        el.rates['RUB']
      ),
      USD: calculateBaseValueFromCurrency(1, el.rates[selectedCurrency]),
      currency: selectedCurrency,
      date: el.date,
      name: selectedCurrency,
    };
    acc.push(temp);
    return acc;
  }, []);
};
