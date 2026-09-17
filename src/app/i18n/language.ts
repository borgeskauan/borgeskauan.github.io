export type Language = 'en' | 'pt';
export function chooseLanguage(saved: string | null, languages: readonly string[]): Language {
  if (saved === 'en' || saved === 'pt') return saved;
  return languages[0]?.toLowerCase().split('-')[0] === 'pt' ? 'pt' : 'en';
}
export function isLocalizedPath(path: string): boolean {
  return ['/', '/projects/pix', '/versions/32', '/versions/32/projects/pix'].includes(path.split(/[?#]/)[0].replace(/\/+$/, '') || '/');
}

export function formatEvidence(value:string,language:Language):string {
  if(language==='en')return value;
  return value.replace(/\d[\d,]*(?:\.\d+)?/g,n=>Number(n.replaceAll(',','')).toLocaleString('pt-BR',{maximumFractionDigits:3})).replace('starts/s','inícios/s');
}
