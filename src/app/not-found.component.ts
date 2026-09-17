import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
@Component({selector: 'app-not-found', imports: [RouterLink], template: `
  <section class="wrap not-found"><p class="eyebrow">404</p><h1>This page isn’t here.</h1>
  <a routerLink="/" class="button primary">Back to the work <span aria-hidden="true">↗</span></a></section>
`})
export class NotFoundComponent {}
