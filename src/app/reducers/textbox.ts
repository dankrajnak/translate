import * as textbox from '../actions/textbox';

export interface State {
  inputText: string;
}

const initialState: State = {
  inputText: '',
};

export function reducer(state = initialState, action: textbox.Actions): State {
  switch (action.type) {
    case textbox.CHANGE_INPUT:
      return {
        inputText: action.payload
      };

   default:
     return state;
  }
}

export const getInputText = (state: State) => state.inputText;

