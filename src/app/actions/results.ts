import { Action } from '@ngrx/store';
import { Language } from './../models/language';

export const TRANSLATE = '[Results] Translate';
export const TRANSLATIONS_COMPLETE = '[Results] Translations Complete';

export class TranslateAction implements Action {
  readonly type = TRANSLATE;

  constructor(public payload: {q: string, from: Language, to: Language}) { }
}

export class TranslationsCompleteAction implements Action {
  readonly type = TRANSLATIONS_COMPLETE;
}

export type Actions = TranslateAction | TranslationsCompleteAction;

