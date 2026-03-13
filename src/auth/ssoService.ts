import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/User';
import { mockServer } from '../api/mockServer';
import { generateId } from '../utils/id';

type Provider = User['provider'];

const SSO_SESSION_KEY = 'socialfarm:sso:session';

function buildProfile(provider: Provider, providerUserId: string, displayName: string): User {
  const existing = mockServer.users.find((user) => user.provider === provider && user.provider_user_id === providerUserId);
  if (existing) return existing;

  const profile: User = {
    id: generateId('user'),
    username: `${provider}-${providerUserId}`,
    displayName,
    avatar: provider === 'google' ? '🟢' : provider === 'apple' ? '🍎' : provider === 'telegram' ? '✈️' : '📧',
    publicKey: '',
    provider,
    provider_user_id: providerUserId,
    linked_accounts: [provider],
    createdAt: Date.now()
  };
  mockServer.users.push(profile);
  return profile;
}

async function persistSession(user: User): Promise<User> {
  await AsyncStorage.setItem(SSO_SESSION_KEY, JSON.stringify(user));
  mockServer.currentUserId = user.id;
  return user;
}

export async function loginWithEmail(email: string): Promise<User> {
  const user = buildProfile('email', email.toLowerCase(), email.split('@')[0] || 'Email User');
  return persistSession(user);
}

export async function loginWithGoogle(): Promise<User> {
  const user = buildProfile('google', 'google-uid-001', 'Google User');
  return persistSession(user);
}

export async function loginWithApple(): Promise<User> {
  const user = buildProfile('apple', 'apple-uid-001', 'Apple User');
  return persistSession(user);
}

export async function loginWithTelegram(): Promise<User> {
  const user = buildProfile('telegram', 'telegram-uid-001', 'Telegram User');
  return persistSession(user);
}
