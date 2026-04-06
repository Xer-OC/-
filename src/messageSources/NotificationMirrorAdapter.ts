import { AggregatedMessage } from '../models/AggregatedMessage';
import { MessageSourceAdapter } from './MessageSourceAdapter';

function mapNotificationToAggregatedMessage(sender: string, text: string, appPackage: string): AggregatedMessage {
  return {
    id: `notif-${Date.now()}`,
    conversationId: `conv-notification-${appPackage}`,
    senderName: sender,
    senderAvatar: '🔔',
    content: text,
    timestamp: Date.now() - 1000 * 60 * 4,
    sourceApp: 'notification',
    externalMessageId: `${appPackage}-${Date.now()}`
  };
}

export class NotificationMirrorAdapter implements MessageSourceAdapter {
  async initialize(): Promise<void> {
    // Android: integrate NotificationListenerService bridge in native module.
    // iOS: integrate push notification content extension when available.
    // MVP uses static mirrored payload.
  }

  async fetchMessages(): Promise<AggregatedMessage[]> {
    return [mapNotificationToAggregatedMessage('Nebula Room', 'New reaction in watch room.', 'socialfarm.rooms')];
  }

  async sendMessage(conversationId: string, content: string): Promise<{ externalMessageId: string }> {
    return { externalMessageId: `notification-out-${conversationId}-${content.length}-${Date.now()}` };
  }

  getSourceName(): AggregatedMessage['sourceApp'] {
    return 'notification';
  }
}
