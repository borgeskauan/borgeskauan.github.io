import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';

let commit=process.env.GITHUB_SHA || '';
let dirty=false;
if(!commit){
  try {
    commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();
    dirty=Boolean(execFileSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim());
  } catch {commit='local';}
}
const info={commit,dirty,builtAt:new Date().toISOString()};
mkdirSync('src/app/generated',{recursive:true});
writeFileSync('src/app/generated/build-info.json',JSON.stringify(info,null,2)+'\n');
console.log(`Build version: ${commit.slice(0,7)}${dirty?'-local':''}`);
