export type AgentCapability = 'summarize_messages' | 'auto_reply' | 'recommend_rooms' | 'remind_events';

export interface Agent {
  id: string;
  name: string;
  personality: string;
  capabilities: AgentCapability[];
}

const agents = new Map<string, Agent>();

export function registerAgent(agent: Agent) {
  agents.set(agent.id, agent);
}

export function getAgents(): Agent[] {
  return Array.from(agents.values());
}
