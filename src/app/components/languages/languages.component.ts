import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { createLanguageService } from 'tslint/lib';
import { Component, OnInit } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/observable/of';

import { Language } from './../../models/language';
import { GoogleTranslateService } from '../../services/google-translate';
import * as fromRoot from '../../reducers';
import * as languages from '../../actions/languages';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css'],
  providers: [GoogleTranslateService],
})

export class LanguagesComponent implements OnInit{
  public selected: string;
  public allLanguages: Language[] = [];
  public languagesSelected$: Observable<Language[]>;

   constructor(
     private store: Store<fromRoot.State>,
     private translateService: GoogleTranslateService
     ) {
     this.languagesSelected$ = this.store.select(fromRoot.getLanguages);
   }


  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.getLanguages();
  }

  public getLanguages(): void {
    this.translateService.getLanguages().then(languages => this.allLanguages = languages);
  }

  public addLanguage(): void {
    const language = this.findLanguage(this.selected);
    if (language) {
      this.store.dispatch(new languages.AddLanguageAction(this.findLanguage(this.selected)));
    }
  }

  public sortableChange(elements: HTMLCollection): void {
    // I couldn't figure out how to interface with ngx-bootstrap in the way I wanted
    // so the way the action and this method are written may seem a little silly...
    // It's written like this pending a different implementation of language selection element.

    let languageStore: Language[];
    this.store.select(fromRoot.getLanguages).subscribe(language => languageStore = language);

    // Find element that was moved by comparing store to current elements (see comment above)
    let current: Language[] = [];
    current = [];
    for (let i = 0; i < elements.length; i++) {
      current.push(this.findLanguage(elements[i].textContent));
    }
    const swap = this.findSwap(languageStore, current);
    if (!swap.movedItem) {
      swap.movedItem = {name: undefined};
    }
    if (swap.to !== swap.from) {
      console.log(swap.movedItem.name + ' moved from ' + swap.from + ' to ' + swap.to + '.');
      this.store.dispatch(new languages.MoveLanguageAction({language: swap.movedItem, from: swap.from, to: swap.to}));
    }
  }

  private findSwap(old: any[], current: any[]): {movedItem: any, from: number, to: number}{
    let movedItem: any;
    let from: number; // Index moved language was moved from
    let to: number;  // Index moved language was moved to

    for (let i = 0; i < old.length; i++) {
      // Find first difference between arrays
      if (current[i] !== old[i]) {
        // Check to see if this element was moved forward to current position
        if (current[i] === old[i + 1]) {
          from = i;
          break;
        } else {
          // This is the element that was moved.
          movedItem = current[i];
          to = i;
          break;
        }
      }
    }
    for (let i = old.length - 1; i >= 0; i--) {
    // Find the end of the swap
      if (current[i] !== old[i]) {
        if (from === undefined) {
        from = i;
        return {movedItem, from, to};
        } else {
          to = i;
          movedItem = current[i];
          return {movedItem, from, to};

        }
      }
    }
    // There were no differences between the arrays.
    return {movedItem: current[0], from: 0, to: 0};
  }

  private findLanguage(name: string): Language {
    return this.allLanguages.find(l => l.name === name);
  }

}

