import { MessageSummary } from '../models/MessageSummary';
import { fetchAllMessages } from './messageAggregator';

export async function summarizeConversation(conversationId: string): Promise<MessageSummary> {
  const messages = await fetchAllMessages();
  const convo = messages.filter((item) => item.conversationId === conversationId);
  const topSenders = Array.from(new Set(convo.map((item) => item.senderName))).slice(0, 3).join(', ') || 'No participants';
  const keyTopics = convo
    .slice(0, 3)
    .map((item) => item.content)
    .join(' • ') || 'No messages yet.';

  return {
    id: `summary-${conversationId}-${Date.now()}`,
    conversation_id: conversationId,
    summary_text: `Conversation includes ${convo.length} messages from ${topSenders}. Highlights: ${keyTopics}`,
    generated_at: Date.now()
  };
}

export async function summarizeDailyMessages(userId: string): Promise<MessageSummary> {
  const messages = await fetchAllMessages();
  const since = Date.now() - 1000 * 60 * 60 * 24;
  const daily = messages.filter((item) => item.timestamp >= since);
  const bySource: Record<string, number> = {};
  daily.forEach((item) => {
    bySource[item.sourceApp] = (bySource[item.sourceApp] ?? 0) + 1;
  });

  const summaryBits = Object.entries(bySource)
    .map(([source, count]) => `${source}: ${count}`)
    .join(', ');

  return {
    id: `daily-${userId}-${Date.now()}`,
    conversation_id: `daily-${userId}`,
    summary_text: `Daily digest: ${daily.length} total messages across sources (${summaryBits || 'no activity'}).`,
    generated_at: Date.now()
  };
}
