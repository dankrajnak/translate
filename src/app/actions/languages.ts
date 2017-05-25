import { Action } from '@ngrx/store';
import { Language } from './../models/language';

export const MOVE_LANGUAGE = '[Languages] Move Language';
export const ADD_LANGUAGE = '[Languages] Add Language';

export class MoveLanguageAction implements Action {
  readonly type = MOVE_LANGUAGE;

  constructor(public payload: {language: Language, from: number, to: number}) { }
}

export class AddLanguageAction implements Action {
  readonly type = ADD_LANGUAGE;

  constructor(public payload: Language) { }
}

export type Actions = MoveLanguageAction | AddLanguageAction;

