import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {projects} from '../src/app/content/projects.ts';

test('homepage features the three strongest current projects',()=>{
  assert.deepEqual(projects.map(({slug,title})=>({slug,title})),[
    {slug:'pix',title:'Instant Payment System'},
    {slug:'valora',title:'Valora'},
    {slug:'support-ai',title:'SupportAI'}
  ]);
  assert.equal(projects[1].destination.kind,'source');
  assert.equal(projects[1].destination.url,'https://github.com/borgeskauan/valora');
  assert.equal(projects[2].destination.kind,'source');
  assert.equal(projects[2].destination.url,'https://github.com/borgeskauan/SupportAI');
});

test('homepage media no longer references superseded projects',()=>{
  const media=fs.readFileSync(new URL('../src/app/home/project-media.component.ts',import.meta.url),'utf8');
  assert.match(media,/@case\('valora'\)/);
  assert.match(media,/@case\('support-ai'\)/);
  assert.doesNotMatch(media,/kafka-chat|movie-discovery|p-chat-diagram/);
});
