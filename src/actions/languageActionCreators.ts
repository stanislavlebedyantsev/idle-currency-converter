import { SET_LANGUAGE, TLanguageActionTypes } from '@/types/actionTypes';

export const setLanguage = (language: string): TLanguageActionTypes => ({
  type: SET_LANGUAGE,
  payload: language,
});
