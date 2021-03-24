import { render, unmountComponentAtNode, fireEvent } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ListAutocomplete from './component';
import { ListItem } from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core/ListItemText';
import { Provider } from 'react-redux';
import { store } from '@/reducers/';

let container = null;

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

it('List autocomplete is render witout props', () => {
  act(() => {
    render(
			<Provider store={store}>
      <ListAutocomplete
        countryList={[]}
        matchedValues={[]}
      />
			</Provider>,
      container
    );
  });
  expect(container.querySelector('input').value).toBe('');
  expect(container.querySelectorAll('span').length).toBe(0);
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
  expect(container.querySelectorAll('span').length).toBe(6);
});
