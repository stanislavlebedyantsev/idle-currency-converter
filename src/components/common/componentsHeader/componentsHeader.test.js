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

describe('Component header tests', () => {
  it('Component header is render without props', () => {
    act(() => {
      render(<ComponentHeader />, container);
    });
    expect(container.textContent).toBe('');
  });
  it('Component header is render with title props', () => {
    act(() => {
      render(<ComponentHeader title="test" />, container);
    });
    expect(container.textContent).toBe('test');
  });
  it('Component header is render with description props', () => {
    act(() => {
      render(<ComponentHeader description="test" />, container);
    });
    expect(container.textContent).toBe('test');
  });
  it('Component header is render with all props', () => {
    act(() => {
      render(<ComponentHeader title="test" description="test" />, container);
    });
    expect(container.textContent).toBe('testtest');
  });
});
