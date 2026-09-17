import {Injectable, Pipe, PipeTransform, afterNextRender, inject, signal} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Meta} from '@angular/platform-browser';
import {Router, NavigationEnd} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {chooseLanguage, isLocalizedPath, formatEvidence, Language} from './language';
import translations from './pt.json';

@Injectable({providedIn:'root'})
export class LocaleService {
  readonly language=signal<Language>('en');
  readonly enabled=signal(false);
  private readonly document=inject(DOCUMENT);
  private readonly router=inject(Router);
  private readonly meta=inject(Meta);
  constructor(){
    afterNextRender(()=>{
      let saved: string|null=null;
      try {saved=localStorage.getItem('portfolio-language');} catch {}
      this.language.set(chooseLanguage(saved,navigator.languages?.length ? navigator.languages : [navigator.language]));
      this.updatePage(this.router.url);
    });
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event=>{
      if(event instanceof NavigationEnd)this.updatePage(event.urlAfterRedirects);
    });
  }
  private updatePage(url:string){
    this.enabled.set(isLocalizedPath(url));
    this.document.documentElement.lang=this.enabled() && this.language()==='pt' ? 'pt-BR' : 'en';
    if(this.enabled()){
      const isCase=url.includes('/projects/pix');
      const description=isCase
        ? 'Instant Payment System: interface, architecture, an interactive payment example, implementation notes and measured results.'
        : 'Kauan Borges — software developer in São Paulo, currently at Bradesco. Selected personal projects, interfaces and engineering notes.';
      this.meta.updateTag({name:'description',content:this.translate(description)});
    }
  }
  select(language:Language){
    this.language.set(language);
    try {localStorage.setItem('portfolio-language',language);} catch {}
    this.updatePage(this.router.url);
  }
  translate(value:unknown):string {
    const source=String(value ?? '');
    if(!this.enabled() || this.language()==='en')return source;
    return (translations as Record<string,string>)[source] ?? source;
  }
  number(value:string):string {
    if(!this.enabled() || this.language()==='en')return value;
    return formatEvidence(value,this.language());
  }
}
@Pipe({name:'t',pure:false})
export class TranslatePipe implements PipeTransform {
  private readonly locale=inject(LocaleService);
  transform(value:unknown):string{return this.locale.translate(value);}
}
@Pipe({name:'localNumber',pure:false})
export class LocalNumberPipe implements PipeTransform {
  private readonly locale=inject(LocaleService);
  transform(value:string):string{return this.locale.number(value);}
}
