import { AggregatedMessage } from '../models/AggregatedMessage';
import { generateReplySuggestions } from '../services/smartReplyService';
import { upsertAgentMemory } from './AgentMemory';
import { getAgents, registerAgent } from './AgentRegistry';

export function initializeAgents() {
  if (getAgents().length) return;

  registerAgent({
    id: 'assistant-1',
    name: 'Sprout Assistant',
    personality: 'Friendly, concise, proactive',
    capabilities: ['summarize_messages', 'auto_reply', 'recommend_rooms', 'remind_events']
  });
}

export function agentRecommendationCard(): { title: string; description: string } {
  initializeAgents();
  return {
    title: 'Agent Recommendation',
    description: 'Nebula Room activity is spiking. Invite friends now for better co-watch engagement.'
  };
}

export function agentAssistantBubble(message: AggregatedMessage): string {
  initializeAgents();
  const suggestions = generateReplySuggestions(message).slice(0, 1);
  return suggestions[0] ?? 'Got it. I can help summarize this thread.';
}

export function processAutomationRule(message: AggregatedMessage): string | null {
  const content = message.content.toLowerCase();
  if (content.includes('harvest')) {
    upsertAgentMemory({
      agent_id: 'assistant-1',
      conversation_id: message.conversationId,
      memory_data: 'Detected harvest keyword trigger',
      updated_at: Date.now()
    });
    return 'Automation rule triggered: farm ready reminder sent.';
  }

  if (content.includes('room')) {
    upsertAgentMemory({
      agent_id: 'assistant-1',
      conversation_id: message.conversationId,
      memory_data: 'Detected room spike keyword trigger',
      updated_at: Date.now()
    });
    return 'Automation rule triggered: room activity summary generated.';
  }

  return null;
}
