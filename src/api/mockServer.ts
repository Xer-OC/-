import { Activity } from '../models/Activity';
import { Friendship } from '../models/Friendship';
import { Item } from '../models/Item';
import { Notification } from '../models/Notification';
import { Presence } from '../models/Presence';
import { Report } from '../models/Report';
import { User } from '../models/User';
import { Wallet } from '../models/Wallet';

export const mockServer = {
  currentUserId: 'you',
  users: [
    { id: 'you', username: 'you', displayName: 'You', avatar: '🧑‍🌾', publicKey: '', provider: 'email', provider_user_id: 'you', linked_accounts: ['email'], createdAt: Date.now() - 100000 } as User,
    { id: 'ava', username: 'ava', displayName: 'Ava Chen', avatar: '🦊', publicKey: '', provider: 'telegram', provider_user_id: 'ava_tg', linked_accounts: ['telegram'], createdAt: Date.now() - 90000 } as User,
    { id: 'noah', username: 'noah', displayName: 'Noah Patel', avatar: '🐼', publicKey: '', provider: 'google', provider_user_id: 'noah_google', linked_accounts: ['google'], createdAt: Date.now() - 80000 } as User,
    { id: 'luna', username: 'luna', displayName: 'Luna Garcia', avatar: '🐰', publicKey: '', provider: 'apple', provider_user_id: 'luna_apple', linked_accounts: ['apple'], createdAt: Date.now() - 70000 } as User,
    { id: 'kai', username: 'kai', displayName: 'Kai Rivera', avatar: '🦁', publicKey: '', provider: 'email', provider_user_id: 'kai', linked_accounts: ['email'], createdAt: Date.now() - 60000 } as User
  ],
  friendships: [
    { id: 'fr-1', requesterId: 'you', receiverId: 'ava', status: 'accepted', createdAt: Date.now() - 1000 * 60 * 60 * 24 },
    { id: 'fr-2', requesterId: 'noah', receiverId: 'you', status: 'pending', createdAt: Date.now() - 1000 * 60 * 25 }
  ] as Friendship[],
  presence: [
    { userId: 'ava', status: 'online', lastSeenAt: Date.now() },
    { userId: 'noah', status: 'offline', lastSeenAt: Date.now() - 1000 * 60 * 11 },
    { userId: 'luna', status: 'watching_video', lastSeenAt: Date.now() - 1000 * 60 * 4 },
    { userId: 'kai', status: 'in_room', lastSeenAt: Date.now() - 1000 * 60 * 2 }
  ] as Presence[],
  wallets: [
    { userId: 'you', coins: 250 },
    { userId: 'ava', coins: 140 }
  ] as Wallet[],
  items: [
    { id: 'item-1', name: 'Growth Boost', effect: '+10% growth', rarity: 'rare' },
    { id: 'item-2', name: 'Golden Feed', effect: '+25% growth', rarity: 'epic' },
    { id: 'item-3', name: 'Decoration', effect: '+social happiness', rarity: 'common' }
  ] as Item[],
  notifications: [
    { id: 'notif-1', userId: 'you', type: 'message', sourceApp: 'telegram', read: false, createdAt: Date.now() - 1000 * 60 * 4 },
    { id: 'notif-2', userId: 'you', type: 'room_invite', sourceApp: 'socialfarm', read: false, createdAt: Date.now() - 1000 * 60 * 12 },
    { id: 'notif-3', userId: 'you', type: 'farm_action', sourceApp: 'discord', read: true, createdAt: Date.now() - 1000 * 60 * 42 }
  ] as Notification[],
  activities: [] as Activity[],
  reports: [] as Report[]
};
