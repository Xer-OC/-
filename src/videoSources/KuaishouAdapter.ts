import { UnifiedVideo, VideoSourceAdapter } from './VideoSourceAdapter';

export class KuaishouAdapter implements VideoSourceAdapter {
  sourceName: UnifiedVideo['source'] = 'kuaishou';

  async fetchVideos(): Promise<UnifiedVideo[]> {
    return [
      {
        id: 'ks-1',
        source: this.sourceName,
        creator: '@co-op.room',
        title: 'Room watch party highlights',
        description: 'Invite flow + reactions.',
        thumbnail: 'ks-thumb'
      }
    ];
  }
}
