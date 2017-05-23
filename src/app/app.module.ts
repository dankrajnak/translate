import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ResutsComponent } from './components/resuts/resuts.component';

import { StoreModule } from '@ngrx/store';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    TextboxComponent,
    LanguagesComponent,
    LoadingComponent,
    ResutsComponent
  ],
  imports: [
    SortableModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
