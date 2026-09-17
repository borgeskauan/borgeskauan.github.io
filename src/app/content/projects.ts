export interface Project {
  slug: string;
  title: string;
  description: string;
  destination: {kind: 'case-study'; route: string} | {kind: 'source'; url: string};
}

export const projects: readonly Project[] = [
  {slug: 'pix', title: 'Instant Payment System',
    description: 'A Java payment system inspired by Pix, with safeguards for repeated requests and missing confirmations.',
    destination: {kind: 'case-study', route: '/projects/pix'}},
  {slug: 'kafka-chat', title: 'Kafka Chatrooms CLI',
    description: 'Public chat rooms in the terminal, with messages carried through Kafka.',
    destination: {kind: 'source', url: 'https://github.com/borgeskauan/kafka-chatrooms-cli'}},
  {slug: 'movie-discovery', title: 'Movie discovery',
    description: 'An Angular app for browsing movies, keeping playlists and writing reviews, using TMDB data.',
    destination: {kind: 'source', url: 'https://github.com/borgeskauan/netflix-frontend'}}
];
