import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Language } from '../models/Language';
import * as API from './api-secrets';



@Injectable()
export class GoogleTranslateService {
  private API_PATH = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: Http) {}

  getLanguages(): Promise<Language[]> {
    return this.http.get(`${this.API_PATH}/languages?target=en&key=${API.KEY}`)
      .toPromise().then(res => res.json().data.languages as Language[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
