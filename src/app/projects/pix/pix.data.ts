import type {Decision} from './pix.types';

const repo = 'https://github.com/borgeskauan/instant-payment-system';
export const decisions: readonly Decision[] = [
  {explanation: 'The payment reference identifies the instruction. A fingerprint compares its normalized contents. A matching repeat produces no new financial effect; different contents under the same reference are a conflict.',
    tradeoff: 'Identity alone is insufficient. Normalization rules become part of the protocol, so the fingerprint is versioned. A repeat does not create another audit fact or rebuild a notification.',
    sourceUrl: `${repo}/blob/master/docs/topics/payment-correctness.md`},
  {explanation: 'Payment state, balance changes, the audit fact and the obligation to notify commit together. Admission reserves the payer’s money. Acceptance credits the receiver; rejection releases the reservation.',
    tradeoff: 'Stable lock ordering and batching control contention, but operations touching the same balance still coordinate. A waiting payment has no automatic timeout in this project.',
    sourceUrl: `${repo}/blob/master/docs/topics/payment-correctness.md`},
  {explanation: 'The committed outbox keeps the result available for publication. Banks read notifications through gRPC with an opaque cursor, and can reconnect within the retained history.',
    tradeoff: 'Delivery is at least once. Readers still handle duplicates and keep their cursor. Replaying an instruction does not manufacture a fresh confirmation; the original notification and recovery path remain authoritative.',
    sourceUrl: `${repo}/blob/master/docs/topics/notification-delivery.md`},
  {explanation: 'A dedicated Rust thread schedules prepared work in 10 ms windows. The test checks the minimum rolling one-second start rate as well as aggregate throughput, final outcomes and replay behavior.',
    tradeoff: 'The generator is part of the measurement system. Missed starts must remain visible. The separate Go/Rust generator experiment compares implementations, not languages in general.',
    sourceUrl: `${repo}/blob/master/docs/engineering-evolution.md`}
];
