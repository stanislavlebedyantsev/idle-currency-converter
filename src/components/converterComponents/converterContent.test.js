import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ConverterContent from './converterContent';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
let container = null;
const mockStore = configureMockStore();

beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Converter content is render', () => {
  let store = mockStore({
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
  });
  act(() => {
    render(
      <Provider store={store}>
        <ConverterContent />
      </Provider>,
      container
    );
  });
  const inputArray = container.querySelectorAll('input');
  expect(inputArray.length).toBe(1);
});
it('Converter content is render with 1 field', () => {
  let store = mockStore({
    converter: {
      allCurrencies: ['BYN', 'USD'],
      inputedValues: [{ currency: 'BYN', value: 1 }],
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
  });
  act(() => {
    render(
      <Provider store={store}>
        <ConverterContent />
      </Provider>,
      container
    );
  });
  const inputArray = container.querySelectorAll('input');
  expect(inputArray[0].value).toBe('BYN');
  expect(inputArray[1].value).toBe('1');
  expect(inputArray[inputArray.length - 1].value).toBe('');
});
it('Converter content is render with 2 field', () => {
  let store = mockStore({
    converter: {
      allCurrencies: ['BYN', 'USD'],
      inputedValues: [
        { currency: 'BYN', value: 1 },
        { currency: 'USD', value: 1 },
      ],
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
  });
  act(() => {
    render(
      <Provider store={store}>
        <ConverterContent />
      </Provider>,
      container
    );
  });
  const inputArray = container.querySelectorAll('input');
  expect(inputArray[0].value).toBe('BYN');
  expect(inputArray[1].value).toBe('1');
  expect(inputArray[2].value).toBe('USD');
  expect(inputArray[3].value).toBe('1');
  expect(inputArray[inputArray.length - 1].value).toBe('');
});
