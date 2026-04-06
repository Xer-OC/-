import { AppRole, PermissionAction } from '../models/Permission';

const permissions: Record<AppRole, PermissionAction[]> = {
  user: [],
  room_admin: ['mute_user', 'delete_message'],
  room_owner: ['kick_user', 'mute_user', 'delete_message']
};

export function can(role: AppRole, action: PermissionAction): boolean {
  return permissions[role].includes(action);
}
