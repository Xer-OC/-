import { AggregatedMessage } from '../models/AggregatedMessage';

export interface MessageSourceAdapter {
  initialize(): Promise<void>;
  fetchMessages(): Promise<AggregatedMessage[]>;
  sendMessage(conversationId: string, content: string): Promise<{ externalMessageId: string }>;
  getSourceName(): AggregatedMessage['sourceApp'];
}
