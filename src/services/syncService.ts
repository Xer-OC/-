import { mockServer } from '../api/mockServer';

export async function syncUserProfile(userId: string) {
  return mockServer.users.find((user) => user.id === userId) ?? null;
}

export async function syncFriends(userId: string) {
  return mockServer.friendships.filter((item) => item.requesterId === userId || item.receiverId === userId);
}

export async function syncRooms() {
  return [];
}

export async function syncFarms() {
  return [];
}
