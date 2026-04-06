import { AggregatedMessage } from '../models/AggregatedMessage';

export function generateReplySuggestions(message: AggregatedMessage): string[] {
  const content = message.content.toLowerCase();

  if (content.includes('invite')) {
    return ['I can join in 5 minutes.', 'Thanks, I am in!', 'Can you share the room link?'];
  }

  if (content.includes('farm') || content.includes('growth')) {
    return ['Nice progress 🚀', 'I will help with farm tasks.', 'Let us sync later today.'];
  }

  return ['Got it, thanks!', 'Sounds good to me.', 'I will follow up shortly.'];
}
