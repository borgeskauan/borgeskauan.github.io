import {TranslatePipe} from '../i18n/locale.service';
import {Component,inject} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {projects} from '../content/projects';
import {projectUrl} from '../content/navigation';

import {ProjectMediaComponent} from './project-media.component';

@Component({selector:'app-home',imports:[TranslatePipe,NgTemplateOutlet,RouterLink,ProjectMediaComponent],template:`
<section class="identity-projects" aria-labelledby="selected-projects">
  <header class="identity-section-title"><h2 id="selected-projects">{{'Projects' | t}}</h2></header>
  <div class="identity-project-list">
    @for(project of projects;track project.slug){
      <article class="identity-project" [attr.aria-labelledby]="'project-' + project.slug">

        <div class="identity-project-inner">
          <div class="identity-project-media" [class.identity-chat-media]="project.slug === 'kafka-chat'">
            @if(project.destination.kind === 'case-study'){<a [routerLink]="projectUrl(project)" [attr.aria-label]="('Open ' + project.title + ' notes') | t"><ng-container [ngTemplateOutlet]="media" [ngTemplateOutletContext]="{project}" /></a>}@else{<a [href]="projectUrl(project)" target="_blank" rel="noopener noreferrer" [attr.aria-label]="('Open ' + project.title + ' repository') | t"><ng-container [ngTemplateOutlet]="media" [ngTemplateOutletContext]="{project}" /></a>}
          </div>
          <div class="identity-project-copy">
            <h3 [id]="'project-' + project.slug">{{(project.title) | t}}</h3>
            <p>{{project.description | t}}</p>
            @if(project.destination.kind === 'case-study'){<a class="identity-project-link" [routerLink]="projectUrl(project)">{{"Project notes" | t}}</a>}@else{<a class="identity-project-link" [href]="projectUrl(project)" target="_blank" rel="noopener noreferrer">{{"Repository" | t}}</a>}
          </div>
        </div>
      </article>
    }
  </div>
</section>
<ng-template #media let-project="project"><app-project-media [project]="project.slug" /></ng-template>
`})
export class HomeComponent {
  readonly projects=projects;
  readonly projectUrl=projectUrl;
  constructor(){inject(Meta).updateTag({name:'description',content:'Kauan Borges — software developer in São Paulo, currently at Bradesco. Selected personal projects, interfaces and engineering notes.'});}
}
