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
  {slug: 'kafka-chat', title: 'Kafka Chatrooms CLI',
    description: 'Public chat rooms where people exchange messages directly from the terminal.',
    destination: {kind: 'source', url: 'https://github.com/borgeskauan/kafka-chatrooms-cli'}},
  {slug: 'movie-discovery', title: 'Movie discovery',
    description: 'An app for discovering movies, organizing them into lists and writing reviews.',
    destination: {kind: 'source', url: 'https://github.com/borgeskauan/netflix-frontend'}}
];
