import { mockServer } from '../api/mockServer';
import { acceptFriendRequest, sendFriendRequest } from './friendService';

function randomCode() {
  return Math.random().toString(36).slice(2, 10);
}

export function generateInviteLink(userId: string): string {
  const code = `${userId.slice(0, 3)}${randomCode()}`;
  return `https://socialfarm.app/invite/${code}`;
}

export function acceptInvite(inviterId: string, inviteeId: string): void {
  const request = sendFriendRequest(inviterId, inviteeId);
  if (request) {
    acceptFriendRequest(request.id);
  }
  mockServer.activities.push({
    id: `activity-${Date.now()}`,
    userId: inviteeId,
    type: 'user_joined_room',
    payload: { inviterId },
    createdAt: Date.now()
  });
}
