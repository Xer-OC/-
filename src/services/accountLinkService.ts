import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/User';
import { mockServer } from '../api/mockServer';

const LINK_KEY_PREFIX = 'socialfarm:linked-accounts:';

function getCurrentUser(): User | undefined {
  return mockServer.users.find((user) => user.id === mockServer.currentUserId);
}

export async function linkAccount(provider: User['provider']): Promise<User['linked_accounts']> {
  const user = getCurrentUser();
  if (!user) return [];

  if (!user.linked_accounts.includes(provider)) {
    user.linked_accounts = [...user.linked_accounts, provider];
  }

  await AsyncStorage.setItem(`${LINK_KEY_PREFIX}${user.id}`, JSON.stringify(user.linked_accounts));
  return user.linked_accounts;
}

export async function unlinkAccount(provider: User['provider']): Promise<User['linked_accounts']> {
  const user = getCurrentUser();
  if (!user) return [];

  user.linked_accounts = user.linked_accounts.filter((item) => item !== provider);
  await AsyncStorage.setItem(`${LINK_KEY_PREFIX}${user.id}`, JSON.stringify(user.linked_accounts));
  return user.linked_accounts;
}

export async function getLinkedAccounts(): Promise<User['linked_accounts']> {
  const user = getCurrentUser();
  if (!user) return [];

  const persisted = await AsyncStorage.getItem(`${LINK_KEY_PREFIX}${user.id}`);
  if (!persisted) return user.linked_accounts;

  return JSON.parse(persisted) as User['linked_accounts'];
}
