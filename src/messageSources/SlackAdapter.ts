import { AggregatedMessage } from '../models/AggregatedMessage';
import { MessageSourceAdapter } from './MessageSourceAdapter';

export class SlackAdapter implements MessageSourceAdapter {
  async initialize(): Promise<void> {}

  async fetchMessages(): Promise<AggregatedMessage[]> {
    return [
      {
        id: 'sl-1',
        conversationId: 'conv-farm-team',
        senderName: 'Farm Team',
        senderAvatar: '🌾',
        content: 'Standup in 10 minutes.',
        timestamp: Date.now() - 1000 * 60 * 16,
        sourceApp: 'slack',
        externalMessageId: 'slack-8822'
      }
    ];
  }

  async sendMessage(conversationId: string, content: string): Promise<{ externalMessageId: string }> {
    return { externalMessageId: `slack-out-${conversationId}-${content.length}-${Date.now()}` };
  }

  getSourceName(): AggregatedMessage['sourceApp'] {
    return 'slack';
  }
}
