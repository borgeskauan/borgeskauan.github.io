import {TranslatePipe} from '../../i18n/locale.service';
import {Component, signal} from '@angular/core';
import {systemParts} from './system-map.data';

@Component({imports:[TranslatePipe],selector:'app-system-map',template:`
<figure class="d-system-map">
  <div class="d-figure-label"><span>{{"Request and result flow" | t}}</span><span>{{"Pix / SPI" | t}}</span></div>
  <div class="d-map-nodes">
    <svg class="d-map-lines" viewBox="0 0 660 240" preserveAspectRatio="none" aria-hidden="true"><path d="M110 58 H550 V180 H110"/><path d="m316 53 7 5-7 5 M546 112l4 7 4-7 M343 175l-7 5 7 5"/></svg>
    @for(part of parts;track part.name;let index=$index){
      <button type="button" [class]="'d-map-node d-node-' + index" [attr.aria-pressed]="selected() === index" (click)="selected.set(index)"><span class="d-node-order">0{{(index+1) | t}}</span><strong>{{part.name | t}}</strong></button>
    }
  </div>
  <div class="d-map-note" aria-live="polite" aria-atomic="true"><strong>{{parts[selected()].name | t}}</strong><p>{{parts[selected()].detail | t}}</p><p class="pix-map-technology">{{"Technology" | t}}: {{parts[selected()].technology}}</p></div>
  <figcaption>{{'Select a component to read its notes.' | t}}</figcaption>
</figure>`})
export class SystemMapComponent {
  readonly parts=systemParts;
  readonly selected=signal(0);
}
