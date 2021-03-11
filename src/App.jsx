import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Router from '@/components/wrappers/Router';
import { store } from '@/reducers/index';
import { currencyRateRequest } from '@/actions/index';
import '@/App.css';

function App() {

  useEffect(() => {
    store.dispatch(currencyRateRequest());
  }, []);

  return (
      <Provider store={store}>
        <Router />
      </Provider>
  );
}

export default App;
