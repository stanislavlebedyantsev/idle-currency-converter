import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import AutocompleteComponent from './AutocompleteComponent';

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

describe('autocomplete tests', () => {
  it('Autocomplete is render with empty props', () => {
    act(() => {
      render(
        <AutocompleteComponent defValue={''} label={''} options={[]} />,
        container
      );
    });
    expect(container.querySelector('input').value).toBe('');
    expect(container.querySelector('label').textContent).toBe('defaultLabel');
  });
  it('Autocomplete is render with props', () => {
    act(() => {
      render(
        <AutocompleteComponent
          defValue={'asd'}
          label={'asd'}
          options={['test1', 'test2']}
        />,
        container
      );
    });
    expect(container.querySelector('input').value).toBe('asd');
    expect(container.querySelector('label').textContent).toBe('asd');
  });
  it('Autocomplete is render without default value', () => {
    act(() => {
      render(
        <AutocompleteComponent
          defValue={''}
          label={'asd'}
          options={['test1', 'test2']}
        />,
        container
      );
    });
    document.querySelector('input').value = 'test1';
    expect(container.querySelector('input').value).toBe('test1');
  });
});
