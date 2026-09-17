import {Component,inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {RouterLink} from '@angular/router';
import {TranslatePipe,LocalNumberPipe} from '../../i18n/locale.service';
import {testRuns} from './results';

@Component({
  selector:'app-payment-study',
  imports:[RouterLink,TranslatePipe,LocalNumberPipe],
  templateUrl:'./payment-study.component.html',
  styleUrl:'./payment-study.component.css'
})
export class PaymentStudyComponent {
  readonly runs=testRuns;
  readonly totalErrors=testRuns.reduce((total,run)=>total+run.errors,0);
  constructor(){
    inject(Meta).updateTag({name:'description',content:'A payment system built and tested by Kauan Borges: sustained demand, response times, and the evidence from two local tests.'});
  }
}
