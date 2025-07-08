export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  duration: number;
  category: string;
  author: string;
  authorId: string;
  likes: number;
  listens: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserInteraction {
  userId: string;
  podcastId: string;
  liked: boolean;
  favorited: boolean;
  listened: boolean;
  listenCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}