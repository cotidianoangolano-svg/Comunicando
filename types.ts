
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  image?: string;
}

export enum TabType {
  HOME = 'home',
  SEARCH = 'search',
  ACTIVITY = 'activity',
  PROFILE = 'profile',
  CREATE = 'create'
}
