import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/reducers/index';
import { act } from 'react-dom/test-utils';
import LineChartContainer from './LineChartContainer';

it('chart is render', () => { 
  act(() => {
    render(
      <Provider store={store}>
        <LineChartContainer />
      </Provider>
    );
  });
});
