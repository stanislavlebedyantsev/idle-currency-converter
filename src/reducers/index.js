import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import converterReducer from './converterReducer';
import chartsReducer from './chartsReducer';
import mapReducer from './mapReducer';
import errorReducer from './errorReducer';
import { rootSaga } from '@/sagas/index';
import { loadFromStorage, saveState } from '@/utils/';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  converter: converterReducer,
  charts: chartsReducer,
  map: mapReducer,
  error: errorReducer,
});

const preloadedState = loadFromStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  preloadedState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveState(store.getState());
});
