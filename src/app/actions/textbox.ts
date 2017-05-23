import { Action } from '@ngrx/store';

export const CHANGE_INPUT = '[TextBox] Change Input';

export class ChangeInput implements Action {
  readonly type = CHANGE_INPUT;
}

export type Actions = ChangeInput;
