import {Component,inject,signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Meta} from '@angular/platform-browser';
import {ActivatedRoute,Router,RouterLink} from '@angular/router';
import {TranslatePipe,LocalNumberPipe} from '../../i18n/locale.service';

@Component({
  selector:'app-payment-study',
  imports:[RouterLink,TranslatePipe,LocalNumberPipe],
  templateUrl:'./payment-study.component.html',
  styleUrl:'./payment-study.component.css'
})
export class PaymentStudyComponent {
  readonly layout=signal<'editorial'|'results'>('editorial');
  private readonly route=inject(ActivatedRoute);
  private readonly router=inject(Router);
  selectLayout(layout:'editorial'|'results'){
    void this.router.navigate([],{
      relativeTo:this.route,
      queryParams:{layout:layout==='results'?'results':null},
      queryParamsHandling:'merge',
      replaceUrl:true
    });
  }
  constructor(){
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params=>{
      this.layout.set(params.get('layout')==='results'?'results':'editorial');
    });
    inject(Meta).updateTag({name:'description',content:'A payment system built and tested by Kauan Borges: sustained demand, response times, and the evidence from two local tests.'});
  }
}
