import { mockServer } from '../api/mockServer';

export function isFriend(userA: string, userB: string): boolean {
  return mockServer.friendships.some(
    (item) =>
      item.status === 'accepted' &&
      ((item.requesterId === userA && item.receiverId === userB) ||
        (item.requesterId === userB && item.receiverId === userA))
  );
}

export function isRequestPending(userA: string, userB: string): boolean {
  return mockServer.friendships.some(
    (item) =>
      item.status === 'pending' &&
      ((item.requesterId === userA && item.receiverId === userB) ||
        (item.requesterId === userB && item.receiverId === userA))
  );
}
