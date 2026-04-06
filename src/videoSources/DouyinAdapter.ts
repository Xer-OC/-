import { UnifiedVideo, VideoSourceAdapter } from './VideoSourceAdapter';

export class DouyinAdapter implements VideoSourceAdapter {
  sourceName: UnifiedVideo['source'] = 'douyin';

  async fetchVideos(): Promise<UnifiedVideo[]> {
    return [
      {
        id: 'dy-1',
        source: this.sourceName,
        creator: '@urbanfarm.lab',
        title: 'Douyin greenhouse loop',
        description: 'Fast crop growth setup.',
        thumbnail: 'dy-thumb'
      }
    ];
  }
}
