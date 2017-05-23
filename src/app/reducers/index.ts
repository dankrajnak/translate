import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';

import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes the
 * state of the reducer plus any selector functions.
 */
import * as fromTextBox from './textbox';

export interface State {
  textBox: fromTextBox.State;
}

// Assemble reducers to create a top level reducer.
const reducers = {
  textBox: fromTextBox.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  console.log(state);
  return developmentReducer(state, action);
}

// Selector functions for TextBox State

export const getTextBoxState = (state: State) => state.textBox;

export const getInputText = createSelector(getTextBoxState, fromTextBox.getInputText);
