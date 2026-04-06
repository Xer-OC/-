import { mockServer } from '../api/mockServer';

export function getWallet(userId: string) {
  let wallet = mockServer.wallets.find((item) => item.userId === userId);
  if (!wallet) {
    wallet = { userId, coins: 0 };
    mockServer.wallets.push(wallet);
  }
  return wallet;
}

export function spendCoins(userId: string, amount: number): boolean {
  const wallet = getWallet(userId);
  if (wallet.coins < amount) return false;
  wallet.coins -= amount;
  return true;
}

export function addCoins(userId: string, amount: number): void {
  const wallet = getWallet(userId);
  wallet.coins += amount;
}
