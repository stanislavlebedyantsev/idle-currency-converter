//import { render, unmountComponentAtNode } from '@testing-library/react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ComponentHeader from './index';

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

it('Component header is render with props', () => {
  act(() => {
    render(<ComponentHeader />, container);
  });
  expect(container.textContent).toBe('');
  act(() => {
    render(<ComponentHeader title="test" />, container);
  });
  expect(container.textContent).toBe('test');
	act(() => {
    render(<ComponentHeader description="test" />, container);
  });
  expect(container.textContent).toBe('test');
	act(() => {
    render(<ComponentHeader title='test' description="test" />, container);
  });
  expect(container.textContent).toBe('testtest');
});
