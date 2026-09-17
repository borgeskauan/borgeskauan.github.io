import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {qualification} from '../src/app/projects/pix/evidence.ts';

for (const key of ['a', 'b']) {
  test(`Run ${key.toUpperCase()} displays the original report's request rate, latency, replays and rolling floor`, async () => {
    const raw = JSON.parse(await readFile(new URL(`../public/evidence/run-${key}.json`, import.meta.url)));
    const view = qualification(key);
    const number = value => Number(value.replaceAll(',', ''));
    assert.equal(number(view.metrics[0]?.value ?? '0'), raw.performance.active_tps.payments);
    assert.equal(number(view.metrics[1].value), raw.performance.latency_ms.p99);
    assert.equal(view.metrics[0].label, 'Original requests / second');
    assert.equal(view.metrics[2].value, '0');
    assert.equal(view.facts.find(f => f.label === 'Lowest rolling one-second rate').value, `${raw.generation.minimum_rolling_tps.toLocaleString('en-US')} starts/s`);
    assert.equal(view.facts.find(f => f.label === 'Payment-request replays accepted').value, `${raw.replays.pacs008.accepted.toLocaleString('en-US')} / ${raw.replays.pacs008.started.toLocaleString('en-US')}`);
    assert.equal(view.facts.find(f => f.label === 'Decision replays accepted').value, `${raw.replays.pacs002.accepted.toLocaleString('en-US')} / ${raw.replays.pacs002.started.toLocaleString('en-US')}`);
    assert.equal(view.rawUrl, `/evidence/run-${key}.json`);
  });
}

test('the two runs retain their different latency and executed workload', () => {
  assert.equal(qualification('a').metrics[1].value, '855.202');
  assert.equal(qualification('b').metrics[1].value, '265.195');
  assert.equal(qualification('a').facts[1].value, '1,889,369 / 1,890,000');
  assert.equal(qualification('b').facts[1].value, '1,890,000 / 1,890,000');
});
