import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import ChartTopToolArea from './ChartTopToolArea';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';

let container = null;
const mockStore = configureMockStore();

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('chart top tool tests', () => {
  it('chart top tool is render without values', () => {
    const store = mockStore({
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
      charts: {
        ratesHistory: [],
        selectedCurrencies: [],
        mappedRates: [],
      },
    });
    act(() => {
      render(
        <Provider store={store}>
          <ChartTopToolArea />
        </Provider>,
        container
      );
    });
    const inputArray = container.querySelectorAll('input');
    expect(inputArray.length).toBe(4);
    expect(inputArray[0].value).toBe('chartsError');
  });

  it('chart top tool is render with init value which can be in checkboxes', () => {
    const store = mockStore({
      converter: {
        allCurrencies: [],
        inputedValues: [],
        localCurrency: {
          name: '',
          code: 'BYN',
          symbol: '',
          native: '',
          plural: '',
        },
        rate: {
          base: '',
          rates: {},
        },
      },
      charts: {
        ratesHistory: [],
        selectedCurrencies: [],
        mappedRates: [],
      },
    });
    act(() => {
      render(
        <Provider store={store}>
          <ChartTopToolArea />
        </Provider>,
        container
      );
    });
    const inputArray = container.querySelectorAll('input');
    expect(inputArray.length).toBe(3);
    expect(inputArray[0].value).toBe('BYN');
  });

  it('chart top tool is render with init value which is not in checkboxes', () => {
    const store = mockStore({
      converter: {
        allCurrencies: [],
        inputedValues: [],
        localCurrency: {
          name: '',
          code: 'EUR',
          symbol: '',
          native: '',
          plural: '',
        },
        rate: {
          base: '',
          rates: {},
        },
      },
      charts: {
        ratesHistory: [],
        selectedCurrencies: [],
        mappedRates: [],
      },
    });
    act(() => {
      render(
        <Provider store={store}>
          <ChartTopToolArea /> 
        </Provider>,
        container
      );
    });
    const inputArray = container.querySelectorAll('input');
    expect(inputArray.length).toBe(4);
    expect(inputArray[0].value).toBe('EUR');
  });
});
