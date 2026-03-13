import { AggregatedMessage } from '../models/AggregatedMessage';

export type PluginPermission = 'read_messages' | 'send_messages' | 'read_rooms' | 'write_rooms';

export type PluginEvent =
  | { type: 'message.received'; payload: AggregatedMessage }
  | { type: 'room.activity_spike'; payload: { roomId: string; activityLevel: number } }
  | { type: 'farm.ready_to_harvest'; payload: { farmId: string } };

export type PluginContext = {
  userId: string;
  permissions: PluginPermission[];
};
