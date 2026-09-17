import {TranslatePipe} from '../../i18n/locale.service';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {TestResultsComponent} from './test-results.component';

@Component({selector:'app-pix',imports:[TranslatePipe,RouterLink,TestResultsComponent],templateUrl:'./pix.component.html',styleUrl:'./pix.component.css'})
export class PixComponent {
  constructor(){inject(Meta).updateTag({name:'description',content:'Instant Payment System: a personal project built and tested to handle thousands of payments per second, with measured local results.'});}
}
