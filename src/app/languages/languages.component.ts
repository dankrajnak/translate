import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent{
  public placeHolderLanguages: string[] = [
    'German',
    'Spanish',
    'French',
    'Portuguese'
  ];

}
