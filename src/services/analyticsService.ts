import { mockServer } from '../api/mockServer';

type AnalyticsEvent = 'app_open' | 'video_watch' | 'room_join' | 'farm_feed' | 'friend_added';

export function trackEvent(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  mockServer.activities.push({
    id: `analytics-${Date.now()}`,
    userId: mockServer.currentUserId,
    type:
      event === 'video_watch'
        ? 'user_watched_video'
        : event === 'farm_feed'
          ? 'user_fed_farm'
          : 'user_joined_room',
    payload: { event, ...payload },
    createdAt: Date.now()
  });
}
