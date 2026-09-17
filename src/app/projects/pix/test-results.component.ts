import {TranslatePipe,LocalNumberPipe} from '../../i18n/locale.service';
import {Component} from '@angular/core';
import {qualification} from './evidence';

@Component({imports:[TranslatePipe,LocalNumberPipe],selector:'app-test-results',template:`
  <p>{{"The two runs used the same code and settings. The workload included successful payments, insufficient-funds rejections and repeated messages." | t}}</p>

    <div class="pix-comparisons">@for(metric of comparisons;track metric.label){<section class="pix-comparison"><h3>{{metric.label | t}}</h3><dl>@for(run of runs;track run.id){<div><dt>{{run.label | t}}</dt><dd>{{metric.value(run) | localNumber}}</dd></div>}</dl></section>}</div>

  <p>{{"Timing is measured from the original request to the first matching final answer received by the paying bank." | t}}</p><p>{{"Run A missed 631 planned request starts; Run B started all 1,890,000." | t}}</p>
  <details class="q-report-details"><summary>{{'Test workload and reports' | t}}</summary><p>{{"The load test sent new requests for 15 minutes, aiming for 2,100 each second. It expected 80% to succeed and 20% to be rejected for insufficient funds. It also repeated messages to check for duplicate effects." | t}}</p><div class="q-report-columns">@for(run of runs;track run.id){<section><h3>{{(run.label) | t}}</h3><dl>@for(fact of run.facts;track fact.label){<div><dt>{{(fact.label) | t}}</dt><dd>{{fact.value | localNumber}}</dd></div>}</dl><a [href]="run.rawUrl" target="_blank" rel="noopener noreferrer">{{(run.label) | t}} {{'report (JSON)' | t}}</a></section>}</div><p>{{"These results describe the documented local computer, configuration and workload. They include both successful and rejected payments. They do not establish how the system would perform in a production bank. The separate Go/Rust generator comparison is a different experiment." | t}}</p></details>
  <p class="q-source-line"><a href="https://github.com/borgeskauan/instant-payment-system/blob/master/docs/performance.md" target="_blank" rel="noopener noreferrer">{{"Test setup and methodology" | t}}</a></p>
`})
export class TestResultsComponent {readonly comparisons=[
{label:'Time for 99% of responses (p99)',value:(run:ReturnType<typeof qualification>)=>run.metrics[1].value+' ms'},
{label:'Average new requests / second',value:(run:ReturnType<typeof qualification>)=>run.metrics[0].value},
{label:'Lowest requests started in a rolling second',value:(run:ReturnType<typeof qualification>)=>run.facts[0].value},
{label:'Reported correctness violations',value:(run:ReturnType<typeof qualification>)=>run.metrics[2].value}
];readonly runs=[qualification('a'),qualification('b')];}
