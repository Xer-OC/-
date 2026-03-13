export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  publicKey: string;
  provider: 'email' | 'google' | 'apple' | 'telegram';
  provider_user_id: string;
  linked_accounts: Array<'email' | 'google' | 'apple' | 'telegram'>;
  createdAt: number;
}
