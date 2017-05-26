import { Action } from '@ngrx/store';
import { Language } from './../models/language';

export const CLEAR_RESULTS = '[Results] Clear Translations';
export const TRANSLATE = '[Results] Translate';
export const GOT_TRANSLATION_RESULT = '[Results] Got Translation Result';
export const TRANSLATION_FAILED = '[Results] Translation Failed';
export const TRANSLATIONS_COMPLETE = '[Results] Translations Complete';
export const TRANSLATE_TO_ENGLISH = '[Results] Translate To English';
export const GOT_ENGLISH_TRANSLATION = '[Results] Got English Translation';



export class TranslateAction implements Action {
  readonly type = TRANSLATE;

  constructor(public payload: {q: string, index: number}) {}
}

export class GotTranslationResultAction implements Action {
  readonly type = GOT_TRANSLATION_RESULT;

  constructor(public payload: string) {}
}

export class TranslationFailedAction implements Action {
  readonly type = TRANSLATION_FAILED;
}

export class TranslationsCompleteAction implements Action {
  readonly type = TRANSLATIONS_COMPLETE;
}

export class ClearResultsAction implements Action {
  readonly type = CLEAR_RESULTS;
}

/**
 * For each language the original text is translated to, it is translated back to English.
 * This action is only fired by an effect on the GotTranslationResult action.  This action
 * has an effect which fires the GotEnglishTranslationAction when the translation is recieved.
 */
export class TranslateToEnglishAction implements Action {
  readonly type = TRANSLATE_TO_ENGLISH;

  constructor(public payload: {q: string, source: Language}) {}
}

export class GotEnglishTranslationAction implements Action {
  readonly type = GOT_ENGLISH_TRANSLATION;

  constructor(public payload: string) {};
}

export type Actions = TranslateAction | GotTranslationResultAction |
  TranslationsCompleteAction | ClearResultsAction | GotEnglishTranslationAction;

