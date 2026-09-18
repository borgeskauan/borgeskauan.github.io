export interface Project {
  slug: string;
  title: string;
  description: string;
  destination: {kind: 'case-study'; route: string} | {kind: 'source'; url: string};
}

export const projects: readonly Project[] = [
  {slug: 'pix', title: 'Instant Payment System',
    description: 'I designed and tested a payment system to understand how it could stay fast and correct under sustained demand.',
    destination: {kind: 'case-study', route: '/projects/pix'}},
  {slug: 'valora', title: 'Valora',
    description: 'An expense tracker for recording transactions and asking about spending through everyday WhatsApp messages.',
    destination: {kind: 'source', url: 'https://github.com/borgeskauan/valora'}},
  {slug: 'support-ai', title: 'SupportAI',
    description: 'A prototype that turns previously solved support cases into FAQ drafts for people to review, edit and approve.',
    destination: {kind: 'source', url: 'https://github.com/borgeskauan/SupportAI'}}
];
