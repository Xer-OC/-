import { AggregatedMessage, SourceApp } from '../models/AggregatedMessage';
import { DiscordAdapter } from '../messageSources/DiscordAdapter';
import { MessageSourceAdapter } from '../messageSources/MessageSourceAdapter';
import { NotificationMirrorAdapter } from '../messageSources/NotificationMirrorAdapter';
import { SlackAdapter } from '../messageSources/SlackAdapter';
import { TelegramAdapter } from '../messageSources/TelegramAdapter';

type ExternalMessageLink = {
  id: string;
  internalMessageId: string;
  externalMessageId: string;
  sourceApp: SourceApp;
};

const adapters = new Map<SourceApp, MessageSourceAdapter>();
const externalMessageLinks: ExternalMessageLink[] = [];

export type AggregatedConversation = {
  conversationId: string;
  senderName: string;
  senderAvatar: string;
  preview: string;
  timestamp: number;
  sourceApp: SourceApp;
};

export function registerAdapter(adapter: MessageSourceAdapter) {
  adapters.set(adapter.getSourceName(), adapter);
}

export async function initializeMessageAggregator() {
  if (adapters.size === 0) {
    registerAdapter(new TelegramAdapter());
    registerAdapter(new DiscordAdapter());
    registerAdapter(new SlackAdapter());
    registerAdapter(new NotificationMirrorAdapter());
  }

  await Promise.all(Array.from(adapters.values()).map((adapter) => adapter.initialize()));
}

export function mergeMessages(messageGroups: AggregatedMessage[][]): AggregatedMessage[] {
  return messageGroups.flat();
}

export function sortByTimestamp(messages: AggregatedMessage[]): AggregatedMessage[] {
  return [...messages].sort((a, b) => b.timestamp - a.timestamp);
}

export async function fetchAllMessages(): Promise<AggregatedMessage[]> {
  await initializeMessageAggregator();
  const groups = await Promise.all(Array.from(adapters.values()).map((adapter) => adapter.fetchMessages()));
  return sortByTimestamp(mergeMessages(groups));
}

export function buildConversationList(messages: AggregatedMessage[]): AggregatedConversation[] {
  const byConversation = new Map<string, AggregatedConversation>();

  messages.forEach((message) => {
    if (!byConversation.has(message.conversationId)) {
      byConversation.set(message.conversationId, {
        conversationId: message.conversationId,
        senderName: message.senderName,
        senderAvatar: message.senderAvatar,
        preview: message.content,
        timestamp: message.timestamp,
        sourceApp: message.sourceApp
      });
    }
  });

  return sortConversations(Array.from(byConversation.values()));
}

export function sortConversations(items: AggregatedConversation[]): AggregatedConversation[] {
  return [...items].sort((a, b) => b.timestamp - a.timestamp);
}

export async function sendMessageThroughAdapter(sourceApp: SourceApp, conversationId: string, content: string): Promise<ExternalMessageLink> {
  const adapter = adapters.get(sourceApp);
  if (!adapter) {
    throw new Error(`Adapter not registered for source app: ${sourceApp}`);
  }

  const result = await adapter.sendMessage(conversationId, content);
  const link: ExternalMessageLink = {
    id: `link-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    internalMessageId: `internal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    externalMessageId: result.externalMessageId,
    sourceApp
  };
  externalMessageLinks.push(link);
  return link;
}

export function getExternalMessageLinks() {
  return externalMessageLinks;
}
