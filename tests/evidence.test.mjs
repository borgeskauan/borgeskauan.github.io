import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {testRuns,summarizeRun} from '../src/app/projects/pix/results.ts';

test('both reports support the published rate and response-time target',()=>{
  for(const run of testRuns){
    assert.ok(Math.abs(run.averageRate-2100)<1, "The rounded headline must be within one attempt per second of each measured average");
    assert.ok(run.lowestRate>=2000);
    assert.ok(run.answerSeconds<1);
  }
});

test('the source reports preserve missed starts and distinguish averages from the lowest second',()=>{
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
