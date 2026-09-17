import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {testRuns,summarizeRun} from '../src/app/projects/pix/results.ts';

test('the response-time chart converts milliseconds to seconds without losing the difference between runs',()=>{
  assert.equal(testRuns[0].answerSeconds,0.855202);
  assert.equal(testRuns[1].answerSeconds,0.265195);
  assert.equal(testRuns[0].answerSeconds.toFixed(2),'0.86');
  assert.equal(testRuns[1].answerSeconds.toFixed(2),'0.27');
});

test('the evidence keeps missed starts visible and distinguishes averages from the lowest second',()=>{
  assert.equal(testRuns[0].averageRate,2099.299);
  assert.equal(testRuns[0].lowestRate,2017);
  assert.equal(testRuns[0].missedStarts,631);
  assert.equal(testRuns[1].averageRate,2100);
  assert.equal(testRuns[1].lowestRate,2079);
  assert.equal(testRuns[1].missedStarts,0);
  assert.equal(testRuns[0].reportUrl,'/evidence/run-a.json');
  assert.equal(testRuns[1].reportUrl,'/evidence/run-b.json');
});

test('reported errors include payment outcomes and both kinds of repeated instructions',async()=>{
  const report=JSON.parse(await readFile(new URL('../public/evidence/run-a.json',import.meta.url)));
  report.scenarios[0].violations=2;
  report.replays.pacs008.violations=3;
  report.replays.pacs002.violations=4;
  assert.equal(summarizeRun(report,'a').errors,9);
  assert.equal(testRuns[0].errors,0);
  assert.equal(testRuns[1].errors,0);
});
