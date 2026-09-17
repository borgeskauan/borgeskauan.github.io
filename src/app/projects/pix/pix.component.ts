import {TranslatePipe} from '../../i18n/locale.service';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {SystemMapComponent} from './system-map.component';
import {PaymentExampleComponent} from './payment-example.component';
import {TestResultsComponent} from './test-results.component';
import {decisions} from './pix.data';

@Component({selector:'app-pix',imports:[TranslatePipe,RouterLink,SystemMapComponent,PaymentExampleComponent,TestResultsComponent],templateUrl:'./pix.component.html',styleUrl:'./pix.component.css'})
export class PixComponent {
  readonly decisions=decisions;
  constructor(){inject(Meta).updateTag({name:'description',content:'Instant Payment System: interface, architecture, an interactive payment example, implementation notes and measured results.'});}
}
