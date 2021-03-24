import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import '@/i18n';

const mockStore = configureMockStore();

test('app is render', () => {
  const store = mockStore({
    user: {
      user: {
        email: '',
      },
      isAuthed: false,
    },
    converter: {
      allCurrencies: [],
      inputedValues: [],
      localCurrency: {
        name: '',
        code: '',
        symbol: '',
        native: '',
        plural: '',
      },
      rate: {
        base: '',
        rates: {},
      },
    },
    map: {
      matchedValues: [],
      countryList: [],
      countryData: {
        name: '',
        latlng: [],
        population: 0,
        capital: '',
        currencies: [],
      },
    },
    charts: {
      ratesHistory: [],
      selectedCurrencies: [],
      mappedRates: [],
    },
    language: {
      language: '',
    },
    error: {
      errorValue: '',
      isError: false,
    },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
