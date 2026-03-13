import { mockServer } from '../api/mockServer';

export function blockUser(requesterId: string, targetUserId: string): void {
  mockServer.friendships.push({
    id: `block-${Date.now()}`,
    requesterId,
    receiverId: targetUserId,
    status: 'blocked',
    createdAt: Date.now()
  });
}

export function reportMessage(reporterId: string, targetUserId: string, reason: string): void {
  mockServer.reports.push({ reporterId, targetUserId, reason });
}
