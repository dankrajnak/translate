import * as languages from '../actions/languages';
import { Language } from 'app/models/language';

export type State = Language[];


const initialState: State = [];

export function reducer (state = initialState, action: languages.Actions): State {
  switch (action.type){
    case languages.ADD_LANGUAGE:
      return state.concat(action.payload);

    case languages.MOVE_LANGUAGE:
      const languagesCopy: Language[] = state.slice();
      languagesCopy.splice(action.payload.to, 0, languagesCopy.splice(action.payload.from, 1)[0]);
      return languagesCopy;

    default:
      return state;
  }
}

export const getLanguages = (state: State) => state;
