export interface Activity {
  id: string;
  userId: string;
  type: 'user_joined_room' | 'user_fed_farm' | 'user_watched_video';
  payload: Record<string, unknown>;
  createdAt: number;
}
