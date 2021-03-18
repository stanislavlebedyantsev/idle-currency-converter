import {
  IConverterState,
  IChartsState,
  IMapState,
  IErrorState,
  IUserState,
} from './reducersTypes';

export interface IRootState {
  converter: IConverterState;
  charts: IChartsState;
  map: IMapState;
  error: IErrorState;
  user: IUserState;
}
