import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import converterReducer from "./converterReducer";
import chartsReducer from "./chartsReducer";
import mapReducer from "./mapReducer";
import { rootSaga } from "@sagas/index";
import { loadFromStorage, saveState } from "@utils/localStorage";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  converter: converterReducer,
  charts: chartsReducer,
  map: mapReducer
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
  saveState(store.getState())
})
