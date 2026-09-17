import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chooseLanguage,isLocalizedPath,formatEvidence} from '../src/app/i18n/language.ts';

const pt=JSON.parse(fs.readFileSync(new URL('../src/app/i18n/pt.json',import.meta.url),'utf8'));
test('browser language chooses Portuguese across regional variants and English otherwise',()=>{
  for(const language of ['pt','pt-BR','pt-PT','PT-br'])assert.equal(chooseLanguage(null,[language]),'pt');
  for(const languages of [['en-US'],['es','pt-BR'],[]])assert.equal(chooseLanguage(null,languages),'en');
});
test('saved selection overrides browser preference; invalid storage falls back to browser',()=>{
  assert.equal(chooseLanguage('en',['pt-BR']),'en');
  assert.equal(chooseLanguage('pt',['en-US']),'pt');
  assert.equal(chooseLanguage('invalid',['pt-BR']),'pt');
});
test('language follows the current pages and their compatibility URLs',()=>{
  for(const path of ['/','/projects/pix','/versions/32','/versions/32/','/versions/32/projects/pix','/versions/32?x=1'])assert.ok(isLocalizedPath(path));
  for(const path of ['/versions/320','/versions/31','/versions','/unavailable'])assert.equal(isLocalizedPath(path),false);
});
test('static translated template text has a complete dictionary',()=>{
  const files=['layout/top-bar.component.ts','layout/build-version.component.ts','layout/portfolio-shell.component.ts','home/home.component.ts','home/project-media.component.ts','projects/pix/payment-study.component.html'];
  for(const file of files){
    const source=fs.readFileSync(new URL('../src/app/'+file,import.meta.url),'utf8');
    for(const m of source.matchAll(/{{["']([^"'\n]+)["'] \| t}}/g))assert.ok(pt[m[1]],'Missing: '+m[1]);
  }
});

test('Portuguese evidence formatting preserves measurements and ratio values',()=>{
  assert.equal(formatEvidence('2,099.299','pt'),'2.099,299');
  assert.equal(formatEvidence('265.195','pt'),'265,195');
  assert.equal(formatEvidence('2,079 starts/s','pt'),'2.079 inícios/s');
  assert.equal(formatEvidence('1,890,000 / 1,890,000','pt'),'1.890.000 / 1.890.000');
  assert.equal(formatEvidence('2,099.299','en'),'2,099.299');
});
