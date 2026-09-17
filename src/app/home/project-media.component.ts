import {TranslatePipe} from '../i18n/locale.service';
import {Component,input} from '@angular/core';

@Component({imports:[TranslatePipe],selector:'app-project-media',template:`
<div [class]="'s-media s-media-' + project()">
  @switch(project()){
    @case('pix'){<img src="/assets/dark/payment-app.png" [alt]="'Payment demo interface with Alice and Bob as example customers' | t" width="1440" height="1000" loading="lazy">}
    @case('movie-discovery'){<img src="/assets/dark/movie-details.png" [alt]="'Movie detail page in the Angular application, with a poster, description and review tabs' | t" width="1920" height="1080" loading="lazy">}
    @case('kafka-chat'){

        <div class="p-chat-diagram" role="img" [attr.aria-label]="&quot;Terminal A and Terminal B exchange messages through Kafka&quot; | t"><span>{{"Terminal A" | t}}</span><span aria-hidden="true">→</span><strong>{{"Kafka" | t}}</strong><span aria-hidden="true">→</span><span>{{"Terminal B" | t}}</span></div>

    }
  }
</div>`})
export class ProjectMediaComponent {readonly project=input('pix');}
