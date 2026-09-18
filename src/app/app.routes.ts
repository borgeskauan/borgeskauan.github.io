import {Routes} from '@angular/router';
export const routes: Routes = [
  {path:'versions/32/projects/pix',redirectTo:'/projects/pix',pathMatch:'full'},
  {path:'versions/32',redirectTo:'/',pathMatch:'full'},
  {path:'',loadComponent:()=>import('./layout/portfolio-shell.component').then(m=>m.PortfolioShellComponent),children:[
    {path:'',title:'Kauan Borges — Software developer',loadComponent:()=>import('./home/home.component').then(m=>m.HomeComponent)},
    {path:'projects/pix',title:'Instant Payment System — Kauan Borges',loadComponent:()=>import('./projects/pix/payment-study.component').then(m=>m.PaymentStudyComponent)}
  ]},
  {path:'**',title:'Page not found — Kauan Borges',loadComponent:()=>import('./not-found.component').then(m=>m.NotFoundComponent)}
];
