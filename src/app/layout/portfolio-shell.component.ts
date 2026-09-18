import {TopBarComponent} from './top-bar.component';
import {TranslatePipe} from '../i18n/locale.service';
import {Component,inject,signal} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {Router,NavigationEnd,RouterOutlet} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {isCasePath} from '../content/navigation';
const portraitAsset='/assets/portrait/kauan-borges.jpg';

@Component({selector:'app-portfolio-shell',imports:[TranslatePipe,RouterOutlet,TopBarComponent],template:`
<div class="portfolio-shell" [class.portfolio-case]="viewingCase()" [class.portfolio-home]="!viewingCase()">
  <div class="identity-layout">

    <app-top-bar />
    @if(!viewingCase()){
      <header class="identity-profile">
        <div class="identity-photo"><img [src]="portrait" [attr.alt]="&quot;Portrait of Kauan Borges&quot; | t" width="1536" height="1536" fetchpriority="high"></div>
        <div class="identity-introduction"><h1>{{"Kauan Borges" | t}}</h1><p class="identity-role">{{"Software developer" | t}}</p></div>
        <p class="identity-bio">{{"Based in São Paulo. Currently at Bradesco, working on backend services and web interfaces." | t}}</p>

      </header>
    }
    <div class="identity-content"><router-outlet /></div>

  </div>
</div>`})
export class PortfolioShellComponent {
  readonly portrait=portraitAsset;
  readonly viewingCase=signal(isCasePath(inject(PlatformLocation).pathname));
  constructor(){inject(Router).events.pipe(takeUntilDestroyed()).subscribe(event=>{if(event instanceof NavigationEnd)this.viewingCase.set(isCasePath(event.urlAfterRedirects));});}
}
