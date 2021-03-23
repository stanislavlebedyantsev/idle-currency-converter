import { TLanguageActionTypes, SET_LANGUAGE } from '@/types/actionTypes/';
import { ILanguageState } from '@/types/reducersTypes/languageTypes';

const initState: ILanguageState = {
  language: '',
};

const languageReducer = (state = initState, action: TLanguageActionTypes) => {
  switch (action.type) {
    case SET_LANGUAGE: {
      return { language: action.payload };
    }
    default:
      return state;
  }
};

export default languageReducer;
