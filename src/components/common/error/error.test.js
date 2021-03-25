import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import Error from './index';
import configureMockStore from 'redux-mock-store';

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

it('error is render', () => {
  let store = mockStore({ error: { errorValue: '', isError: false } });
  act(() => {
    render(
      <Provider store={store}>
        <Error />
      </Provider>,
      container
    );
  });
  expect(container.textContent).toBe('');

  store = mockStore({ error: { errorValue: 'asd', isError: false } });

  act(() => {
    render(
      <Provider store={store}>
        <Error />
      </Provider>,
      container
    );
  });
  expect(container.textContent).toBe('asd');
});
