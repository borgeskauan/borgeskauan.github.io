import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {join} from 'node:path';
const root='build';
for(const [route,expected] of [['',['Kauan Borges','Software developer','Projects','Instant Payment System','Valora','SupportAI']],['projects/pix',['The challenge','The process','The results','Payments per second','under a second.','Inspired by where Pix started.','2,100','99%','How I built and tested it','Source code']]]){
 const html=await readFile(join(root,route,'index.html'),'utf8');
 for(const text of expected)assert.ok(html.includes(text),`${route}: ${text}`);
 assert.ok(!/app-build-version|build-version|version-details/.test(html),`${route}: no version debug UI`);
 if(route==='projects/pix'){assert.ok(html.includes('app-payment-study'));assert.ok(!/app-payment-example|app-system-map|app-test-results|pix-story|pix-metrics|study-chart|study-record/.test(html));}
 assert.ok(!/Compare versions|All versions|identity-versions|editions|href="\/versions/.test(html),'No historical navigation');
 for(const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)){
  const url=match[1]; if(!url||url==='/')continue;
  const target=join(root,url);await stat(url.endsWith('.js')||url.endsWith('.css')||/\.[a-z0-9]+$/i.test(url)?target:join(target,'index.html'));
 }
 console.log('Verified current page:',route||'/');
}
for(const [route,target] of [['versions/32','/'],['versions/32/projects/pix','/projects/pix']]){
 const html=await readFile(join(root,route,'index.html'),'utf8');
 assert.ok(html.includes(`url=${target}\"`),`${route}: redirect reaches the current page`);
}
const versionFolders=await readdir(join(root,'versions'));assert.deepEqual(versionFolders,['32']);
for(const name of await readdir(root))assert.ok(!/^(editions|showcase-|pix-original|console|layers)/.test(name),'No archived sites');
console.log('Verified assets, links, and removal of archived pages.');
