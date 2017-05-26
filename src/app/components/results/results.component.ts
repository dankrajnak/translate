import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/combineLatest';


import * as fromRoot from '../../reducers';
import * as results from '../../actions/results';
import {Language } from '../../models/language';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  public translations: Observable<string[]>;
  public languages: Observable<Language[]>;
  public english: Observable<string[]>


  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.translations = this.store.select(fromRoot.getTranslations);
    this.languages = this.store.select(fromRoot.getLanguages);
    this.english = this.store.select(fromRoot.getEnglish);
  }

}
