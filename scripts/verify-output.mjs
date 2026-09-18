import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {join} from 'node:path';
const root='build';
const buildInfo=JSON.parse(await readFile('src/app/generated/build-info.json','utf8'));
for(const [route,expected] of [['',['Kauan Borges','Software developer','Projects','Instant Payment System','Movie discovery']],['projects/pix',['Setting the target','Finding what needed to change','Both tests met the target','Target: at least 2,000','Met in both tests','2,100','99%','Test reports']]]){
 const html=await readFile(join(root,route,'index.html'),'utf8');
 for(const text of expected)assert.ok(html.includes(text),`${route}: ${text}`);
 assert.ok(html.includes('app-build-version') && html.includes(buildInfo.commit.slice(0,7)),`${route}: loaded build version`);
 assert.ok(html.includes(buildInfo.builtAt),`${route}: build timestamp`);
 if(route==='projects/pix'){assert.ok(html.includes('app-payment-study'));assert.ok(!/app-payment-example|app-system-map|app-test-results|pix-story|pix-metrics|study-chart|study-record/.test(html));}
 assert.ok(!/Compare versions|All versions|identity-versions|editions|href="\/versions/.test(html),'No historical navigation');
 for(const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)){
  const url=match[1]; if(!url||url==='/')continue;
  const target=join(root,url);await stat(url.endsWith('.js')||url.endsWith('.css')||/\.[a-z0-9]+$/i.test(url)?target:join(target,'index.html'));
 }
 console.log('Verified current page:',route||'/');
}
const versionFolders=await readdir(join(root,'versions'));assert.deepEqual(versionFolders,['32']);
for(const name of await readdir(root))assert.ok(!/^(editions|showcase-|pix-original|console|layers)/.test(name),'No archived sites');
console.log('Verified assets, links, and removal of archived pages.');
