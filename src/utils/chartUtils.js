import moment from 'moment';
import {
  calculateCurrencyFromBase,
  calculateBaseValueFromCurrency,
} from '@/utils/';

export const chartsUploadMapper = (rates) => {
  const uploadTime = moment().valueOf();
  const uploadData = {
    date: uploadTime,
    rates: rates,
  };
  return uploadData;
};

export const checkLastUpload = (lastUploadeData) => {
  const SIX_HOUR_IN_MILLISECONDS = 21600000;
  const now = moment().valueOf();
  if (moment(now).diff(lastUploadeData) >= SIX_HOUR_IN_MILLISECONDS) {
    return true;
  }
  return false;
};

export const displayedCharts = (selectedCurrency, chartsData) => {
  return chartsData.reduce((acc, el) => {
    const temp = {
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
