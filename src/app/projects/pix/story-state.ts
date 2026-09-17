export interface StoryState {
  step: number;
  requests: number;
  payments: number;
  sender: number;
  receiver: number;
  confirmed: boolean;
  recorded: boolean;
}

export function storyState(step: number): StoryState {
  const bounded = Math.min(7, Math.max(0, Math.trunc(Number.isFinite(step) ? step : 0)));
  const payments = bounded === 0 ? 0 : bounded === 4 ? 2 : 1;
  const requests = bounded === 0 ? 0 : bounded === 3 || bounded === 4 || bounded >= 6 ? 2 : 1;
  return {
    step: bounded, requests, payments,
    sender: 1000 - payments * 100, receiver: 500 + payments * 100,
    confirmed: bounded === 7, recorded: bounded >= 5
  };
}
