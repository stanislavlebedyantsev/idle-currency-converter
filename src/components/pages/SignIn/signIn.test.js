import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SignInPage from './component';

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

describe('sign in page tests', () => {
  it('Sign in is render', () => {
    const store = mockStore({
      user: {
        isAuthed: false,
      },
      error: {
        errorValue: '',
        isError: false,
      },
    });
    act(() => {
      render(
        <Provider store={store}>
          <SignInPage />
        </Provider>,
        container
      );
    });
    const inputArray = container.querySelectorAll('input');
    const pArray = container.querySelectorAll('p');
    expect(inputArray.length).toBe(2);
    expect(pArray.length).toBe(0);
    expect(inputArray[0].value).toBe('');
    expect(inputArray[1].value).toBe('');
  });
  it('Sign in is render with value on 1 field', () => {
    const store = mockStore({
      user: {
        isAuthed: false,
      },
      error: {
        errorValue: '',
        isError: false,
      },
    });
    act(() => {
      render(
        <Provider store={store}>
          <SignInPage />
        </Provider>,
        container
      );
    });
    const inputArray = container.querySelectorAll('input');
    inputArray[0].value = 'asd';
    expect(inputArray.length).toBe(2);
    expect(inputArray[0].value).toBe('asd');
    expect(inputArray[1].value).toBe('');
  });
  it('Sign in is render with click on Sign-up button', () => {
    const store = mockStore({
      user: {
        isAuthed: false,
      },
      error: {
        errorValue: '',
        isError: false,
      },
    });
    act(() => {
      render(
        <Provider store={store}>
          <SignInPage />
        </Provider>,
        container
      );
    });
    const button = document.querySelector('[data-testid=signUp]');
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const inputArray = container.querySelectorAll('input');
    expect(inputArray.length).toBe(3);
  });
  it('Sign in is render with click on Sign-up button twice', () => {
    const store = mockStore({
      user: {
        isAuthed: false,
      },
      error: {
        errorValue: '',
        isError: false,
      },
    });
    act(() => {
      render(
        <Provider store={store}>
          <SignInPage />
        </Provider>,
        container
      );
    });
    const button = document.querySelector('[data-testid=signUp]');
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    let inputArray = container.querySelectorAll('input');
    expect(inputArray.length).toBe(3);
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    inputArray = container.querySelectorAll('input');
    expect(inputArray.length).toBe(2);
  });
});
