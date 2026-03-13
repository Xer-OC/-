import { mockServer } from '../api/mockServer';
import { Notification } from '../models/Notification';
import { generateId } from '../utils/id';

export function pushNotification(userId: string, type: Notification['type']): Notification {
  const notification: Notification = {
    id: generateId('notif'),
    userId,
    type,
    read: false,
    createdAt: Date.now()
  };
  mockServer.notifications.push(notification);
  return notification;
}

export function getNotifications(userId: string): Notification[] {
  return mockServer.notifications.filter((item) => item.userId === userId);
}

export function markRead(notificationId: string) {
  const target = mockServer.notifications.find((item) => item.id === notificationId);
  if (target) target.read = true;
}
