import { mockServer } from '../api/mockServer';
import { Presence } from '../models/Presence';

type PresenceListener = (presence: Presence) => void;
const listeners = new Set<PresenceListener>();

export function updatePresence(userId: string, status: Presence['status']) {
  const existing = mockServer.presence.find((item) => item.userId === userId);
  const next: Presence = { userId, status, lastSeenAt: Date.now() };

  if (existing) {
    existing.status = status;
    existing.lastSeenAt = next.lastSeenAt;
  } else {
    mockServer.presence.push(next);
  }

  listeners.forEach((listener) => listener(next));
}

export function subscribePresence(listener: PresenceListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPresence(userId: string): Presence['status'] {
  return mockServer.presence.find((item) => item.userId === userId)?.status ?? 'offline';
}
