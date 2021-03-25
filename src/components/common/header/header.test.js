import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import Error from './index';
import configureMockStore from 'redux-mock-store';
import Header from '@/components/common/header';
import { BrowserRouter } from 'react-router-dom';

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

describe('header tests', () => {
  it('Header is render without email', () => {
    let store = mockStore({ user: {} });
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>,
        container
      );
    });
    expect(container.querySelector('p').textContent).toBe('');
  });
  it('Header is render with email', () => {
    const store = mockStore({ user: { user: { email: 'asd' } } });
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>,
        container
      );
    });
    expect(container.querySelector('p').textContent).toBe('asd');
  });
});
