type AgentMemoryRecord = {
  agent_id: string;
  conversation_id: string;
  memory_data: string;
  updated_at: number;
};

const memoryStore = new Map<string, AgentMemoryRecord>();

export function upsertAgentMemory(record: AgentMemoryRecord) {
  memoryStore.set(`${record.agent_id}:${record.conversation_id}`, { ...record, updated_at: Date.now() });
}

export function getAgentMemory(agentId: string, conversationId: string): AgentMemoryRecord | null {
  return memoryStore.get(`${agentId}:${conversationId}`) ?? null;
}
