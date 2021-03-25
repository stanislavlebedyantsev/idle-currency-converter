import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ListAutocomplete from './component';
import { Provider } from 'react-redux';
import { store } from '@/reducers/';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

let container = null;

Enzyme.configure({ adapter: new Adapter() });

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

describe('List autocomplete tests', () => {
  it('List autocomplete is render witout props', () => {
    act(() => {
      render(
        <Provider store={store}>
          <ListAutocomplete countryList={[]} matchedValues={[]} />
        </Provider>,
        container
      );
    });
    expect(container.querySelector('input').value).toBe('');
    expect(container.querySelector('ul').childElementCount).toBe(0);
  });

  it('List autocomplete is render with props', () => {
    act(() => {
      render(
        <Provider store={store}>
          <ListAutocomplete
            countryList={['asd', 'qwe', 'zxc']}
            matchedValues={[]}
          />
        </Provider>,
        container
      );
    });
    expect(container.querySelector('input').value).toBe('');
    expect(container.querySelector('ul').childElementCount).toBe(3);
  });
});
