import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync, readFileSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const script=fileURLToPath(new URL('../scripts/write-build-info.mjs',import.meta.url));
function generate(root,env={}) {
  execFileSync(process.execPath,[script],{cwd:root,env:{...process.env,GITHUB_SHA:'',...env}});
  return JSON.parse(readFileSync(join(root,'src/app/generated/build-info.json'),'utf8'));
}

test('deployment metadata records the build commit and time',()=>{
  const root=mkdtempSync(join(tmpdir(),'portfolio-version-'));
  try {
    const before=Date.now();
    const info=generate(root,{GITHUB_SHA:'1234567890abcdef1234567890abcdef12345678'});
    assert.equal(info.commit,'1234567890abcdef1234567890abcdef12345678');
    assert.equal(info.dirty,false);
    assert.ok(Date.parse(info.builtAt)>=before && Date.parse(info.builtAt)<=Date.now());
  } finally {rmSync(root,{recursive:true,force:true});}
});

test('local builds identify the checkout and mark uncommitted changes',()=>{
  const root=mkdtempSync(join(tmpdir(),'portfolio-version-'));
  const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
  try {
    git('init');
    writeFileSync(join(root,'example.txt'),'original');
    git('add','example.txt');
    git('-c','user.name=Version test','-c','user.email=test@example.invalid','-c','commit.gpgsign=false','commit','-m','Fixture');
    const commit=git('rev-parse','HEAD');
    assert.equal(generate(root).commit,commit);
    assert.equal(generate(root).dirty,false);
    writeFileSync(join(root,'example.txt'),'changed');
    const changed=generate(root);
    assert.equal(changed.commit,commit);
    assert.equal(changed.dirty,true);
  } finally {rmSync(root,{recursive:true,force:true});}
});
