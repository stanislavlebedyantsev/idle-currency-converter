import React from 'react';
import { Provider } from 'react-redux';
import Router from '@/components/wrappers/Router';
import { store } from '@/reducers/index';
import '@/App.css';

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
