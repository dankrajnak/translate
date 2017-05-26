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
import * as fromLanguages from './languages';
import * as fromResults from './results';

export interface State {
  textBox: fromTextBox.State;
  languages: fromLanguages.State;
  results: fromResults.State;
}

// Assemble reducers to create a top level reducer.
const reducers = {
  textBox: fromTextBox.reducer,
  languages: fromLanguages.reducer,
  results: fromResults.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}

// Selector functions for TextBox State
export const getTextBoxState = (state: State) => state.textBox;
export const getInputText = createSelector(getTextBoxState, fromTextBox.getInputText);


// Selector functions for Languages State
export const getLanguagesState = (state: State) => state.languages;
export const getLanguages = createSelector(getLanguagesState, fromLanguages.getLanguages);

// Selector function for Results State
export const getResultsState = (state: State) => state.results;
export const getTranslations = createSelector(getResultsState, fromResults.getTranslations);
export const getEnglish = createSelector(getResultsState, fromResults.getEnglish);
