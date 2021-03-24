import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/reducers/index';
import ChartTopToolArea from './ChartTopToolArea';
import { act } from 'react-dom/test-utils';

it('chart top tool is render', () => {
  act(() => {
    render(
      <Provider store={store}>
        <ChartTopToolArea />
      </Provider>
    );
  });
});
