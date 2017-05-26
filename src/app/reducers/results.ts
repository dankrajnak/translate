import * as results from '../actions/results';
import { Language } from 'app/models/language';

export interface State {
  translations: string[];
  english: string[];
}


const initialState: State = {
  translations: [],
  english: [],
};

export function reducer (state = initialState, action: results.Actions): State {
  switch (action.type) {
    case results.GOT_TRANSLATION_RESULT:
      return {
        ...state,
        translations: state.translations.concat(action.payload)
      };
    case results.CLEAR_RESULTS:
      return initialState;

    case results.GOT_ENGLISH_TRANSLATION:
      return {
        ...state,
        english: state.english.concat(action.payload)
      };
    default:
      return state;
  }
}

export const getTranslations = (state: State) => state.translations;
export const getEnglish = (state: State) => state.english;
