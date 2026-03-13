import AsyncStorage from '@react-native-async-storage/async-storage';
import { ensureUserKeyPair } from '../crypto/keyManager';
import { User } from '../models/User';
import { mockServer } from '../api/mockServer';
import { generateId } from '../utils/id';

const SESSION_KEY = 'socialfarm:session:user';

export async function login(username: string): Promise<User> {
  const keys = await ensureUserKeyPair();
  const existing = mockServer.users.find((item) => item.username === username);

  const user: User =
    existing ?? {
      id: generateId('user'),
      username,
      displayName: username,
      avatar: '🙂',
      publicKey: keys.publicKey,
      provider: 'email',
      provider_user_id: username,
      linked_accounts: ['email'],
      createdAt: Date.now()
    };

  if (!existing) {
    mockServer.users.push(user);
  }

  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  mockServer.currentUserId = user.id;
  return user;
}

export async function getSessionUser(): Promise<User | null> {
  const data = await AsyncStorage.getItem(SESSION_KEY);
  if (!data) return null;
  return JSON.parse(data) as User;
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
