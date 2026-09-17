export interface Decision {
  explanation: string;
  tradeoff: string;
  sourceUrl: string;
}
export interface EvidenceRun {
  id: string;
  label: string;
  metrics: readonly {label: string; value: string}[];
  facts: readonly {label: string; value: string}[];
  rawUrl: string;
}
