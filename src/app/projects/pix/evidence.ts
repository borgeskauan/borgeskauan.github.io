import runA from '../../../../public/evidence/run-a.json' with {type: 'json'};
import runB from '../../../../public/evidence/run-b.json' with {type: 'json'};
import type {EvidenceRun} from './pix.types';

const qualificationReports = {a: runA, b: runB};
export function qualification(key: 'a' | 'b'): EvidenceRun {
  const report = qualificationReports[key];
  const format = (value: number) => value.toLocaleString('en-US', {maximumFractionDigits: 3});
  const violations = report.scenarios.reduce((sum, scenario) => sum + scenario.violations, 0)
    + report.replays.pacs008.violations + report.replays.pacs002.violations;
  return {
    id: key, label: `Run ${key.toUpperCase()}`,
    metrics: [
      {label: 'Original requests / second', value: format(report.performance.active_tps.payments)},
      {label: 'End-to-end p99', value: format(report.performance.latency_ms.p99)},
      {label: 'Correctness violations', value: format(violations)}
    ],
    facts: [
      {label: 'Lowest rolling one-second rate', value: `${format(report.generation.minimum_rolling_tps)} starts/s`},
      {label: 'Original requests started', value: `${format(report.generation.executed_originals)} / ${format(report.generation.planned_originals)}`},
      {label: 'Payment-request replays accepted', value: `${format(report.replays.pacs008.accepted)} / ${format(report.replays.pacs008.started)}`},
      {label: 'Decision replays accepted', value: `${format(report.replays.pacs002.accepted)} / ${format(report.replays.pacs002.started)}`}
    ],
    rawUrl: `/evidence/run-${key}.json`
  };
}
