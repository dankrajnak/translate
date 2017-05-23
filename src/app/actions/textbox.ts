import { Action } from '@ngrx/store';

export const CHANGE_INPUT = '[TextBox] Change Input';

export class ChangeInputAction implements Action {
  readonly type = CHANGE_INPUT;

  constructor(public payload: string) { }
}

export type Actions = ChangeInputAction;
