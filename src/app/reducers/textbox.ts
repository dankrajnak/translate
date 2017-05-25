import * as textbox from '../actions/textbox';

export type State = string;


const initialState: State = '';

export function reducer(state = initialState, action: textbox.Actions): State {
  switch (action.type) {
    case textbox.CHANGE_INPUT:
      return action.payload;
   default:
     return state;
  }
}

export const getInputText = (state: State) => state;

