import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as textBox from '../../actions/textbox';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-textbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {
  inputText$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {

    this.inputText$ = this.store.select(fromRoot.getInputText);
   }

  ngOnInit() {
  }

  changeInputText(newText: string) {
    this.store.dispatch(new textBox.ChangeInputAction(newText));
  }
}
