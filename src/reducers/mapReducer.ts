import {
  UPDATE_COUNTRY_DATA,
  UPDATE_MATCHED_VALUES_LIST_DATA,
  UPDATE_COUNTRY_LIST,
  TMapActionTypes,
} from '@/types/actionTypes';
import { IMapState } from '@/types/reducersTypes';
import { INIT_MAP_LAT_LNG } from '@/constants';

const initState: IMapState = {
  matchedValues: [],
  countryList: [],
  countryData: {
    name: '',
    latlng: INIT_MAP_LAT_LNG,
    population: 0,
    capital: '',
    currencies: [],
  },
};

const mapReducer = (state = initState, action: TMapActionTypes): IMapState => {
  switch (action.type) {
    case UPDATE_COUNTRY_LIST: {
      return { ...state, countryList: [...action.payload] };
    }
    case UPDATE_MATCHED_VALUES_LIST_DATA: {
      return { ...state, matchedValues: [...action.payload] };
    }
    case UPDATE_COUNTRY_DATA: {
      return { ...state, countryData: action.payload };
    }
    default:
      return state;
  }
};

export default mapReducer;
