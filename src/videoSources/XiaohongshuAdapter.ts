import { UnifiedVideo, VideoSourceAdapter } from './VideoSourceAdapter';

export class XiaohongshuAdapter implements VideoSourceAdapter {
  sourceName: UnifiedVideo['source'] = 'xiaohongshu';

  async fetchVideos(): Promise<UnifiedVideo[]> {
    return [
      {
        id: 'xhs-1',
        source: this.sourceName,
        creator: '@socialfarm.daily',
        title: 'Co-farm aesthetic setup',
        description: 'Cloud farm cozy room tour.',
        thumbnail: 'xhs-thumb'
      }
    ];
  }
}
