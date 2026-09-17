import {Component,inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {TranslatePipe} from '../i18n/locale.service';
import buildInfo from '../generated/build-info.json';

@Component({
  selector:'app-build-version',
  imports:[TranslatePipe],
  template:`
    <footer class="build-version">
      <details>
        <summary>{{"Version" | t}} · <code>{{version}}</code></summary>
        <div class="version-details">
          <p>{{"Built" | t}} <time [attr.datetime]="info.builtAt">{{builtAt}}</time></p>
          @if(info.dirty){<p>{{"Includes unpublished changes" | t}}</p>}
          <div class="version-actions">
            @if(info.commit !== 'local'){
              <a [href]="commitUrl" target="_blank" rel="noopener noreferrer">{{"View commit" | t}}</a>
            }
            <button type="button" (click)="reload()">{{"Reload page" | t}}</button>
          </div>
        </div>
      </details>
    </footer>
  `,
  styleUrl:'./build-version.component.css'
})
export class BuildVersionComponent {
  readonly info=buildInfo;
  readonly version=buildInfo.commit.slice(0,7)+(buildInfo.dirty?'-local':'');
  readonly builtAt=buildInfo.builtAt.replace('T',' ').replace(/\.\d+Z$/,' UTC');
  readonly commitUrl='https://github.com/borgeskauan/borgeskauan.github.io/commit/'+buildInfo.commit;
  private readonly document=inject(DOCUMENT);
  reload(){this.document.defaultView?.location.reload();}
}
