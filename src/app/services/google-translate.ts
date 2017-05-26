import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Language } from '../models/Language';
import * as Secret from './api-secrets';



@Injectable()
export class GoogleTranslateService {
  private API_PATH = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: Http) {}

  getLanguages(): Promise<Language[]> {
    return this.http.get(`${this.API_PATH}/languages?target=en&key=${Secret.KEY}`)
      .toPromise().then(res => res.json().data.languages as Language[])
      .catch(this.handleError);
  }

  translate(q: string, from: Language, to: Language): Observable<string> {
    return this.http.post(`${this.API_PATH}?key=${Secret.KEY}`, {q, source: from.language, target: to.language})
      .map(res => res.json().data.translations[0].translatedText);
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
