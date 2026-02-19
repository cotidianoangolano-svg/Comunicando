
import { Post, User } from './types';

export const MOCK_USER: User = {
  id: 'me',
  username: 'conecta_user',
  displayName: 'Conecta Dev',
  avatar: 'https://picsum.photos/seed/me/200/200',
  verified: true
};

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      id: 'u1',
      username: 'tech_guru',
      displayName: 'Tech Guru',
      avatar: 'https://picsum.photos/seed/u1/200/200',
      verified: true
    },
    content: 'Just launched the new **Conecta+** interface. The *dark mode* feels so much better! What do you guys think? 🚀 #dev #social',
    timestamp: '2h',
    likes: 1240,
    replies: 42
  },
  {
    id: '2',
    author: {
      id: 'u2',
      username: 'nature_lover',
      displayName: 'Gaia Spirit',
      avatar: 'https://picsum.photos/seed/u2/200/200',
    },
    content: 'Found this **amazing spot** during my morning hike today. Nature is the *best therapy*.',
    timestamp: '4h',
    likes: 850,
    replies: 12,
    image: 'https://picsum.photos/seed/nature/600/400'
  },
  {
    id: '3',
    author: {
      id: 'u3',
      username: 'chef_mario',
      displayName: 'Mario Rossi',
      avatar: 'https://picsum.photos/seed/u3/200/200',
      verified: true
    },
    content: 'The secret to a perfect Carbonara? It\'s all in the **pecorino** and the *quality* of the eggs. Never use cream! 🍝🇮🇹',
    timestamp: '5h',
    likes: 2100,
    replies: 156
  }
];
