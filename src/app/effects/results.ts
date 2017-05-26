import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';

import { GoogleTranslateService } from '../services/google-translate';
import * as results from '../actions/results';
import * as fromRoot from '../reducers';
import { Language } from 'app/models/Language';


@Injectable()
export class ResultsEffects {

  @Effect()
  translation$: Observable<Action> = this.actions$
    .ofType(results.TRANSLATE)
    .map(toPayload)
    .withLatestFrom(this.store.select(fromRoot.getLanguages),
      (payload, languages) => { return {payload, languages}; })
    .mergeMap(({ payload, languages }) => {
      if (payload.index === 0) {
        this.store.dispatch( new results.ClearResultsAction());
        return this.translateService.translate(payload.q, {name: 'English', language: 'en'}, languages[payload.index]);
      }
      return this.translateService.translate(payload.q, languages[payload.index - 1], languages[payload.index]);
    })
    .map(res => new results.GotTranslationResultAction(res))
    .catch(() => Observable.of(new results.TranslationFailedAction()));

    @Effect()
    result$: Observable<Action> = this.actions$
      .ofType(results.GOT_TRANSLATION_RESULT)
      .map(toPayload)
      .do(payload => {
        let languages: Language[];
        let numTranslations: number;
        this.store.select(fromRoot.getLanguages).first().subscribe(l => languages = l);
        this.store.select(fromRoot.getTranslations).first().subscribe(translations => numTranslations = translations.length);
        this.store.dispatch(new results.TranslateToEnglishAction({q: payload, source: languages[numTranslations - 1]}));
      })
      .map(payload => {
          let numLanguages: number;
          let numTranslations: number;
          this.store.select(fromRoot.getLanguages).first().subscribe(languages => numLanguages = languages.length);
          this.store.select(fromRoot.getTranslations).first().subscribe(translations => numTranslations = translations.length);
          if (numTranslations < numLanguages){
            return new results.TranslateAction({q: payload, index: numTranslations});
          }
          return new results.TranslationsCompleteAction;
      });

    @Effect()
    english$: Observable<Action> = this.actions$
      .ofType(results.TRANSLATE_TO_ENGLISH)
      .map(toPayload)
      .do(payload => console.log(payload))
      .mergeMap(payload => this.translateService.translate(payload.q, payload.source, {name: 'English', language: 'en'}))
      .map(res => new results.GotEnglishTranslationAction(res));

  constructor(private actions$: Actions, private translateService: GoogleTranslateService, private store: Store<fromRoot.State>) {}
}
