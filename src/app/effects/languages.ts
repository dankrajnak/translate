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
import * as languages from '../actions/languages';
import * as fromRoot from '../reducers';
import { Language } from 'app/models/Language';


@Injectable()
export class LanguageEffects {

  @Effect()
  moved$: Observable<Action> = this.actions$
    .ofType(languages.MOVE_LANGUAGE)
    .do(() => this.store.dispatch(new results.ClearResultsAction))
    .map(() => {
      let input: string;
      this.store.select(fromRoot.getInputText).first().subscribe(text => input = text);
      return new results.TranslateAction({q: input, index: 0});
    });

  constructor(private actions$: Actions, private translateService: GoogleTranslateService, private store: Store<fromRoot.State>) {}
}
