import {
  SET_MAP_ERROR,
  SET_CONVERTER_ERROR,
  SET_GEOLOCATION_ERROR,
  SET_CHARTS_ERROR,
  REMOVE_ERROR,
} from "@actions/index";

const initState = {
  map: '',
  geolocation: '',
  converter: '',
  charts: '',
};

const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_MAP_ERROR: {
      return { ...state, map: action.payload };
    }
    case SET_CONVERTER_ERROR: {
      return { ...state, converter: action.payload.message };
    }
    case SET_GEOLOCATION_ERROR: {
      return { ...state, geolocation: action.payload.message };
    }
    case SET_CHARTS_ERROR: {
      return { ...state, charts: action.payload.message };
    }
    case REMOVE_ERROR: {
      return { ...state, [action.payload]: undefined };
    }
    default:
      return state;
  }
};

export default errorReducer;
