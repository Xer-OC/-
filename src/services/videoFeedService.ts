import { DouyinAdapter } from '../videoSources/DouyinAdapter';
import { KuaishouAdapter } from '../videoSources/KuaishouAdapter';
import { UnifiedVideo } from '../videoSources/VideoSourceAdapter';
import { XiaohongshuAdapter } from '../videoSources/XiaohongshuAdapter';

function shuffle<T>(list: T[]): T[] {
  return [...list].sort(() => Math.random() - 0.5);
}

export async function getUnifiedFeed(): Promise<UnifiedVideo[]> {
  const adapters = [new DouyinAdapter(), new KuaishouAdapter(), new XiaohongshuAdapter()];
  const feeds = await Promise.all(adapters.map((adapter) => adapter.fetchVideos()));
  return shuffle(feeds.flat());
}
