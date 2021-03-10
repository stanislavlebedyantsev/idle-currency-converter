import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Router from '@/components/wrappers/Router';
import { store } from '@/reducers/index';
import { currencyRateRequest } from '@/actions/index';
import { BrowserRouter } from 'react-router-dom';
import '@/App.css';

function App() {

  useEffect(() => {
    store.dispatch(currencyRateRequest());
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
