import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TextboxComponent } from './textbox/textbox.component';
import { LanguagesComponent } from './languages/languages.component';
import { LoadingComponent } from './loading/loading.component';
import { ResutsComponent } from './resuts/resuts.component';

@NgModule({
  declarations: [
    AppComponent,
    TextboxComponent,
    LanguagesComponent,
    LoadingComponent,
    ResutsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
