export const SET_LANGUAGE = 'SET_LANGUAGE';

interface ISetLanguage {
  type: typeof SET_LANGUAGE;
  payload: string;
}

export type TLanguageActionTypes = ISetLanguage
