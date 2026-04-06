export type SourceApp = 'telegram' | 'discord' | 'slack' | 'notification';

export interface AggregatedMessage {
  id: string;
  conversationId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: number;
  sourceApp: SourceApp;
  externalMessageId: string;
}
