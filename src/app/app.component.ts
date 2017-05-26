import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from './reducers';
import * as results from './actions/results';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private store: Store<fromRoot.State>) {}

  translate(): void{
    this.store.select(fromRoot.getInputText).first()
      .subscribe(val => this.store.dispatch(new results.TranslateAction({q: val, index: 0})));
  }
}
