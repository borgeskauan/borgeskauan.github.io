import runA from '../../../../public/evidence/run-a.json' with {type:'json'};
import runB from '../../../../public/evidence/run-b.json' with {type:'json'};

export function summarizeRun(report:typeof runA,id:'a'|'b') {
  return {
    id,
    label:id==='a'?'First run':'Second run',
    averageRate:report.performance.active_tps.payments,
    lowestRate:report.generation.minimum_rolling_tps,
    answerSeconds:report.performance.latency_ms.p99/1000,
    answerMilliseconds:report.performance.latency_ms.p99,
    missedStarts:report.generation.planned_originals-report.generation.executed_originals,
    errors:report.scenarios.reduce((total,scenario)=>total+scenario.violations,0)
      +report.replays.pacs008.violations+report.replays.pacs002.violations,
    reportUrl:`/evidence/run-${id}.json`
  };
}
export const testRuns=[summarizeRun(runA,'a'),summarizeRun(runB,'b')];
