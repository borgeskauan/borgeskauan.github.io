import {rm} from 'node:fs/promises';
// Never publish files left over from a removed route.
await rm(new URL('../build/',import.meta.url),{recursive:true,force:true});
