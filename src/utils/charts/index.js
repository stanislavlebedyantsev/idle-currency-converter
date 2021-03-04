import moment from "moment";
import {
  calculateCurrencyFromBase,
  calculateBaseValueFromCurrency,
} from "@utils/currencyConvert";

export const chartsUploadMapper = (rates) => {
  const uploadTime = moment().valueOf();
  const uploadData = {
    date: uploadTime,
    rates: rates,
  };
  return uploadData;
};

export const checkLastUpload = (lastUploadeData) => {
  const now = moment().valueOf();
  if (moment(now).diff(lastUploadeData) >= 21600000) {
    return true;
  }
  return false;
};

export const displayedCharts = (selectedCurrency, chartsData) => {
  return chartsData.reduce((acc, el) => {
    const temp = {
      BYN: calculateCurrencyFromBase(
        1 / el.rates[selectedCurrency],
        el.rates["BYN"]
      ),
      RUB: calculateCurrencyFromBase(
        1 / el.rates[selectedCurrency],
        el.rates["RUB"]
      ),
      USD: calculateBaseValueFromCurrency(1, el.rates[selectedCurrency]),
      currency: selectedCurrency,
      date: 1614842881214,
      name: selectedCurrency,
    };
    acc.push(temp);
    return acc;
  }, []);
};
