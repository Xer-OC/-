import { Farm, InboxThread, Room, VideoItem } from '../types/models';

export const videos: VideoItem[] = [
  { id: '1', creator: 'Ava', avatar: '🦊', title: 'Floating greenhouse build', description: 'iOS-style cozy farm room setup.', source: 'TikTok' },
  { id: '2', creator: 'Noah', avatar: '🐼', title: 'Idle farming tips', description: '3 upgrades that speed growth.', source: 'Shorts' },
  { id: '3', creator: 'Luna', avatar: '🐰', title: 'Pet reveal in room #orchard', description: 'New co-op pet unlocked ✨', source: 'Reels' }
];

export const rooms: Room[] = [
  { id: 'r1', name: 'Nebula Room', avatar: '🌌', users: 12, nowPlaying: 'Greenhouse aesthetic clips' },
  { id: 'r2', name: 'Harvest Club', avatar: '🌾', users: 8, nowPlaying: 'Best idle optimization reels' }
];

export const inboxThreads: InboxThread[] = [
  { id: 'i1', platform: 'Telegram', name: 'Ava Chen', avatar: '🦊', preview: 'Invite sent to room now.', unread: 2, time: '2m' },
  { id: 'i2', platform: 'Discord', name: 'Noah Patel', avatar: '🐼', preview: 'Fed the farm +5% growth.', unread: 1, time: '12m' }
];

export const starterFarm: Farm = {
  id: 'farm-1',
  pet: 'Sky Berry Fox',
  level: 4,
  growth: 38,
  owners: ['Ava', 'Noah', 'You'],
  foodStock: 6,
  lastUpdatedAt: Date.now() - 1000 * 60 * 20
};
