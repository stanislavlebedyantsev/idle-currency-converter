import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import converterReducer from './converterReducer';

import {rootSaga} from '@sagas/converterSagas'

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  converter: converterReducer
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga);