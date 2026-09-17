import {BootstrapContext, bootstrapApplication} from '@angular/platform-browser';
import {mergeApplicationConfig} from '@angular/core';
import {provideServerRendering, withRoutes, RenderMode} from '@angular/ssr';
import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';
export default (context: BootstrapContext) => bootstrapApplication(AppComponent,
  mergeApplicationConfig(appConfig,{providers:[provideServerRendering(withRoutes([
    {path:'',renderMode:RenderMode.Prerender},
    {path:'projects/pix',renderMode:RenderMode.Prerender},
    {path:'versions/32',renderMode:RenderMode.Prerender},
    {path:'versions/32/projects/pix',renderMode:RenderMode.Prerender},
    {path:'**',renderMode:RenderMode.Client}
  ]))]}),context);
