import { AggregatedMessage } from '../models/AggregatedMessage';
import { MessageSourceAdapter } from './MessageSourceAdapter';

export class TelegramAdapter implements MessageSourceAdapter {
  async initialize(): Promise<void> {}

  async fetchMessages(): Promise<AggregatedMessage[]> {
    return [
      {
        id: 'tg-1',
        conversationId: 'conv-ava',
        senderName: 'Ava Chen',
        senderAvatar: '🦊',
        content: 'Invite accepted. See you in room.',
        timestamp: Date.now() - 1000 * 60 * 2,
        sourceApp: 'telegram',
        externalMessageId: 'telegram-9931'
      }
    ];
  }

  async sendMessage(conversationId: string, content: string): Promise<{ externalMessageId: string }> {
    return { externalMessageId: `telegram-out-${conversationId}-${content.length}-${Date.now()}` };
  }

  getSourceName(): AggregatedMessage['sourceApp'] {
    return 'telegram';
  }
}
