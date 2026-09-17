import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet, NavigationEnd} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <a class="skip-link" [routerLink]="[]" fragment="main">Skip to content</a>

    <main id="main" tabindex="-1"><router-outlet /></main>

  `
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  constructor() {
    inject(Router).events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationEnd && event.id > 1 && !event.urlAfterRedirects.includes('#')) {
        this.document.getElementById('main')?.focus({preventScroll: true});
      }
    });
  }
}
