export interface Presence {
  userId: string;
  status: 'online' | 'offline' | 'watching_video' | 'in_room' | 'feeding_farm';
  lastSeenAt: number;
}
