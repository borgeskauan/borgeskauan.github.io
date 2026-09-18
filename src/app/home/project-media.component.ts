import {TranslatePipe} from '../i18n/locale.service';
import {Component,input} from '@angular/core';

@Component({imports:[TranslatePipe],selector:'app-project-media',template:`
<div [class]="'s-media s-media-' + project()">
  @switch(project()){
    @case('pix'){<img src="/assets/dark/payment-app.png" [alt]="'Payment demo interface with Alice and Bob as example customers' | t" width="1440" height="1000" loading="lazy">}
    @case('valora'){<img src="/assets/dark/valora-conversation.jpg" [alt]="'WhatsApp conversation used to find and update a recorded expense' | t" width="1080" height="757" loading="lazy">}
    @case('support-ai'){<img src="/assets/dark/support-ai-faq.png" [alt]="'SupportAI FAQ draft shown beside the source support cases and review controls' | t" width="1888" height="1884" loading="lazy">}
  }
</div>`})
export class ProjectMediaComponent {readonly project=input('pix');}
