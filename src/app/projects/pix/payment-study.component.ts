import {Component,inject,afterNextRender,viewChild,ElementRef,DestroyRef} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {RouterLink} from '@angular/router';
import {TranslatePipe,LocalNumberPipe} from '../../i18n/locale.service';

@Component({
  selector:'app-payment-study',
  imports:[RouterLink,TranslatePipe,LocalNumberPipe],
  templateUrl:'./payment-study.component.html',
  styleUrl:'./payment-study.component.css'
})
export class PaymentStudyComponent {
  private readonly results=viewChild<ElementRef<HTMLElement>>('results');
  constructor(){
    const destroyRef=inject(DestroyRef);
    afterNextRender(()=>{
      const element=this.results()?.nativeElement;
      if(!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      const observer=new IntersectionObserver(entries=>{
        if(entries.some(entry=>entry.isIntersecting)){
          element.classList.add('is-revealing');
          observer.disconnect();
        }
      },{threshold:.15});
      observer.observe(element);
      destroyRef.onDestroy(()=>observer.disconnect());
    });
    inject(Meta).updateTag({name:'description',content:'A payment system built and tested by Kauan Borges: sustained demand, response times, and the evidence from two local tests.'});
  }
}
