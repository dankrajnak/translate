import { GoogleTranslateService } from './services/google-translate';
import { ResultsEffects } from './effects/results';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SortableModule } from 'ngx-bootstrap/sortable';

import { AppComponent } from './app.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ResultsComponent } from './components/results/results.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './reducers';


@NgModule({
  declarations: [
    AppComponent,
    TextboxComponent,
    LanguagesComponent,
    LoadingComponent,
    ResultsComponent,
  ],
  imports: [
    SortableModule.forRoot(),
    TypeaheadModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(ResultsEffects),
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [GoogleTranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
