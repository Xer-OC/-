export type VideoItem = {
  id: string;
  creator: string;
  avatar: string;
  title: string;
  description: string;
  source: 'TikTok' | 'Reels' | 'Shorts';
};

export type Room = {
  id: string;
  name: string;
  avatar: string;
  users: number;
  nowPlaying: string;
};

export type Farm = {
  id: string;
  pet: string;
  level: number;
  growth: number;
  owners: string[];
  foodStock: number;
  lastUpdatedAt: number;
};

export type InboxThread = {
  id: string;
  platform: 'Telegram' | 'Discord';
  name: string;
  avatar: string;
  preview: string;
  unread: number;
  time: string;
};

export type EncryptedMessage = {
  id: string;
  senderId: string;
  ciphertext: string;
  nonce: string;
  timestamp: number;
};
