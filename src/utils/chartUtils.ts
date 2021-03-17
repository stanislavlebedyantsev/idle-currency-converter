import moment, { Moment, MomentRelativeTime } from 'moment';
import {
  calculateCurrencyFromBase,
  calculateBaseValueFromCurrency,
} from 'src/utils/';

type TChartUpload = {
  date: number;
  rates?: any;
};
type TChartsData = {
  BYN: number;
  USD: number;
  RUB: number;
  currency: string;
  date: number;
  name: string;
};

export const chartsUploadMapper = (rates:any): TChartUpload => {
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

export const predisplayedChartsMapper = (selectedCurrency:string, chartsData:any): TChartsData => {
  return chartsData.reduce((acc: Array<TChartsData>, el: any) => {
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
