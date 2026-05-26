import { useState, useEffect } from 'react';
import { User, Post, Notification } from '@/types';

const INITIAL_USERS: User[] = [
  {
    id: '1',
    username: 'skater_mia',
    fullName: 'Mia Thompson',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/456d7a56-d019-46f0-adc9-99131b2d1d79/teen-girl-2-1861821f-1779820253279.webp',
    bio: 'Skate or die 🛹 | 16 | LA vibe',
    isInvited: false,
    password: 'password'
  },
  {
    id: '2',
    username: 'neon_alex',
    fullName: 'Alex Chen',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/456d7a56-d019-46f0-adc9-99131b2d1d79/teen-boy-2-1bc4b4f0-1779820252633.webp',
    bio: 'Gamer 🎮 | Coding is life | 17',
    isInvited: false,
    password: 'password'
  },
  {
    id: '3',
    username: 'music_lily',
    fullName: 'Lily Rodriguez',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/456d7a56-d019-46f0-adc9-99131b2d1d79/teen-girl-1-3a28f68e-1779820253289.webp',
    bio: 'Music is my escape 🎧 | Singer | Dreamer',
    isInvited: true,
    password: 'password'
  },
  {
    id: '4',
    username: 'stylish_leo',
    fullName: 'Leo Martinez',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/456d7a56-d019-46f0-adc9-99131b2d1d79/teen-boy-1-2ea7d04e-1779820252579.webp',
    bio: 'Street style | Photography | 15',
    isInvited: false,
    password: 'password'
  },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: '1',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/456d7a56-d019-46f0-adc9-99131b2d1d79/feed-post-1-36fe5fc0-1779820253784.webp',
    caption: 'Best day ever with the squad! 🌟 #summervibes',
    likes: 124,
    timestamp: '2h ago',
  },
  {
    id: 'p2',
    userId: '3',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/456d7a56-d019-46f0-adc9-99131b2d1d79/feed-post-2-f7a19cbd-1779820254063.webp',
    caption: 'That concert was insane! 🎸🔥',
    likes: 89,
    timestamp: '5h ago',
  },
  {
    id: 'p3',
    userId: '4',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/456d7a56-d019-46f0-adc9-99131b2d1d79/feed-post-3-7a229056-1779820253557.webp',
    caption: 'Clean aesthetics for a productive day. ☁️',
    likes: 56,
    timestamp: 'Yesterday',
  },
];

export function useSocialStore() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('teen_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('teen_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [posts] = useState<Post[]>(INITIAL_POSTS);

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('teen_notifications');
    return saved ? JSON.parse(saved) : [
      { id: 'n1', userId: '3', type: 'invite', timestamp: '10m ago', read: false },
      { id: 'n2', userId: '1', type: 'like', timestamp: '1h ago', read: true },
    ];
  });

  useEffect(() => {
    localStorage.setItem('teen_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('teen_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const login = (username: string, password?: string) => {
    const user = users.find(u => u.username === username);
    if (user) {
      // For this mock, if they provided a password, check it, else just log in (for first time dev ease)
      if (password && user.password && user.password !== password) {
        throw new Error("Invalid password");
      }
      setCurrentUser(user);
      localStorage.setItem('teen_user', JSON.stringify(user));
      return user;
    } else {
      throw new Error("User not found. Please sign up!");
    }
  };

  const register = (userData: Partial<User>) => {
    const exists = users.find(u => u.username === userData.username);
    if (exists) {
      throw new Error("Username already taken");
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: userData.username || 'teen_user',
      fullName: userData.fullName || 'New Teen',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      bio: userData.bio || 'New to Teengram!',
      isInvited: false,
      password: userData.password || 'password'
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('teen_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('teen_user');
  };

  const toggleInvite = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newState = !u.isInvited;
        if (newState) {
          const newNotif: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            userId: currentUser?.id || 'anon',
            type: 'invite',
            timestamp: 'Just now',
            read: false
          };
          setNotifications(prevNotifs => [newNotif, ...prevNotifs]);
        }
        return { ...u, isInvited: newState };
      }
      return u;
    }));
  };

  return {
    currentUser,
    users,
    posts,
    notifications,
    login,
    register,
    logout,
    toggleInvite,
  };
}