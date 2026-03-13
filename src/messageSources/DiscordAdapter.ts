import { AggregatedMessage } from '../models/AggregatedMessage';
import { MessageSourceAdapter } from './MessageSourceAdapter';

export class DiscordAdapter implements MessageSourceAdapter {
  async initialize(): Promise<void> {}

  async fetchMessages(): Promise<AggregatedMessage[]> {
    return [
      {
        id: 'dc-1',
        conversationId: 'conv-noah',
        senderName: 'Noah Patel',
        senderAvatar: '🐼',
        content: 'Farm growth is now 58%.',
        timestamp: Date.now() - 1000 * 60 * 9,
        sourceApp: 'discord',
        externalMessageId: 'discord-2271'
      }
    ];
  }

  async sendMessage(conversationId: string, content: string): Promise<{ externalMessageId: string }> {
    return { externalMessageId: `discord-out-${conversationId}-${content.length}-${Date.now()}` };
  }

  getSourceName(): AggregatedMessage['sourceApp'] {
    return 'discord';
  }
}
