import { mockServer } from '../api/mockServer';
import { Friendship } from '../models/Friendship';

export function sendFriendRequest(requesterId: string, receiverId: string): Friendship | null {
  if (requesterId === receiverId) return null;

  const existing = mockServer.friendships.find(
    (item) =>
      (item.requesterId === requesterId && item.receiverId === receiverId) ||
      (item.requesterId === receiverId && item.receiverId === requesterId)
  );

  if (existing) {
    return existing;
  }

  const request: Friendship = {
    id: `fr-${Date.now()}`,
    requesterId,
    receiverId,
    status: 'pending',
    createdAt: Date.now()
  };
  mockServer.friendships.push(request);
  return request;
}

export function acceptFriendRequest(requestId: string): Friendship | null {
  const target = mockServer.friendships.find((item) => item.id === requestId);
  if (!target) return null;
  target.status = 'accepted';
  return target;
}

export function rejectFriendRequest(requestId: string): boolean {
  const before = mockServer.friendships.length;
  mockServer.friendships = mockServer.friendships.filter((item) => item.id !== requestId);
  return before !== mockServer.friendships.length;
}

export function getFriends(userId: string) {
  const accepted = mockServer.friendships.filter(
    (item) => item.status === 'accepted' && (item.requesterId === userId || item.receiverId === userId)
  );

  return accepted
    .map((friendship) => {
      const friendId = friendship.requesterId === userId ? friendship.receiverId : friendship.requesterId;
      const user = mockServer.users.find((item) => item.id === friendId);
      const presence = mockServer.presence.find((item) => item.userId === friendId);
      if (!user) return null;
      return {
        friendship,
        user,
        presence: presence?.status ?? 'offline'
      };
    })
    .filter(Boolean);
}

export function getPendingRequests(userId: string) {
  return mockServer.friendships
    .filter((item) => item.status === 'pending' && item.receiverId === userId)
    .map((request) => {
      const requester = mockServer.users.find((item) => item.id === request.requesterId);
      return {
        request,
        requester
      };
    })
    .filter((item) => item.requester);
}
