export type UnifiedVideo = {
  id: string;
  source: 'douyin' | 'kuaishou' | 'xiaohongshu';
  creator: string;
  title: string;
  description: string;
  thumbnail: string;
};

export interface VideoSourceAdapter {
  sourceName: UnifiedVideo['source'];
  fetchVideos(): Promise<UnifiedVideo[]>;
}
