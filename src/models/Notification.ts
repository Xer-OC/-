export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'friend_request' | 'room_invite' | 'farm_action';
  read: boolean;
  createdAt: number;
}
