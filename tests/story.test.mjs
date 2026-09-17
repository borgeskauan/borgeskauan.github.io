import {test} from 'node:test';
import assert from 'node:assert/strict';
import {storyState} from '../src/app/projects/pix/story-state.ts';

test('losing the confirmation does not undo a completed payment', () => {
  const paid = storyState(1);
  const missingReply = storyState(2);
  assert.equal(paid.payments, 1);
  assert.equal(missingReply.sender, 900);
  assert.equal(missingReply.receiver, 600);
  assert.equal(missingReply.confirmed, false);
});

test('retry remains the same intent but the unprotected rule moves money twice', () => {
  const inTransit = storyState(3);
  assert.equal(inTransit.requests, 2);
  assert.equal(inTransit.payments, 1);
  const broken = storyState(4);
  assert.equal(broken.payments, 2);
  assert.equal(broken.sender, 800);
  assert.equal(broken.receiver, 700);
});

test('revisiting the first payment and matching a replay never adds a second debit', () => {
  const recorded = storyState(5);
  const retried = storyState(6);
  const confirmed = storyState(7);
  assert.equal(recorded.recorded, true);
  for (const state of [recorded, retried, confirmed]) {
    assert.equal(state.payments, 1);
    assert.equal(state.sender, 900);
    assert.equal(state.receiver, 600);
  }
  assert.equal(confirmed.requests, 2);
  assert.equal(confirmed.confirmed, true);
});

test('step navigation is bounded and reset produces a fresh untouched example', () => {
  assert.deepEqual(storyState(-3), storyState(0));
  assert.deepEqual(storyState(999), storyState(7));
  const changed = storyState(7);
  changed.sender = 0;
  assert.equal(storyState(7).sender, 900);
  assert.equal(storyState(0).sender, 1000);
  assert.equal(storyState(0).requests, 0);
});
