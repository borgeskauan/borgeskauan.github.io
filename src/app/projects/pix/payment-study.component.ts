import {Component,inject,signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NgTemplateOutlet} from '@angular/common';
import {Meta} from '@angular/platform-browser';
import {ActivatedRoute,Router,RouterLink} from '@angular/router';
import {TranslatePipe,LocalNumberPipe} from '../../i18n/locale.service';

@Component({
  selector:'app-payment-study',
  imports:[RouterLink,TranslatePipe,LocalNumberPipe,NgTemplateOutlet],
  templateUrl:'./payment-study.component.html',
  styleUrl:'./payment-study.component.css'
})
export class PaymentStudyComponent {
  readonly layout=signal<'editorial'|'results'|'overview'|'sequence'>('editorial');
  private readonly route=inject(ActivatedRoute);
  private readonly router=inject(Router);
  selectLayout(value:string){
    const layout=value==='results'||value==='overview'||value==='sequence'?value:'editorial';
    void this.router.navigate([],{
      relativeTo:this.route,
      queryParams:{layout:layout==='editorial'?null:layout},
      queryParamsHandling:'merge',
      replaceUrl:true
    });
  }
  constructor(){
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params=>{
      const value=params.get('layout');
      this.layout.set(value==='results'||value==='overview'||value==='sequence'?value:'editorial');
    });
    inject(Meta).updateTag({name:'description',content:'A payment system built and tested by Kauan Borges: sustained demand, response times, and the evidence from two local tests.'});
  }
}
