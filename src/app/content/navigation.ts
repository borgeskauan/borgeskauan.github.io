import type {Project} from './projects';
export function projectUrl(project:Project):string{return project.destination.kind==='case-study'?project.destination.route:project.destination.url;}
export function isCasePath(url:string):boolean{return url.split(/[?#]/)[0].replace(/\/+$/,'').endsWith('/projects/pix');}
