import { AggregatedMessage } from '../models/AggregatedMessage';

const messageIndex = new Map<string, AggregatedMessage>();
const redisLikeCache = new Map<string, AggregatedMessage[]>();
const SEARCH_LIMIT = 100;

export function indexMessage(message: AggregatedMessage) {
  messageIndex.set(message.id, message);
  redisLikeCache.clear();
}

export function searchMessages(query: string): AggregatedMessage[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const cached = redisLikeCache.get(normalized);
  if (cached) return cached;

  const results = Array.from(messageIndex.values())
    .filter((message) => {
      return (
        message.senderName.toLowerCase().includes(normalized) ||
        message.content.toLowerCase().includes(normalized) ||
        message.sourceApp.toLowerCase().includes(normalized) ||
        String(message.timestamp).includes(normalized)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, SEARCH_LIMIT);

  redisLikeCache.set(normalized, results);
  return results;
}

export function clearMessageIndex() {
  messageIndex.clear();
  redisLikeCache.clear();
}
