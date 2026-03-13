import { AgentCapability } from '../agents/AgentRegistry';

export interface Agent {
  id: string;
  name: string;
  personality: string;
  capabilities: AgentCapability[];
}
