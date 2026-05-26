export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  isInvited: boolean;
  password?: string;
}

export interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  likes: number;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'invite' | 'like' | 'comment';
  timestamp: string;
  read: boolean;
}