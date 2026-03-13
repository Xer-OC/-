export type SpatialLayoutType = 'circle' | 'theater' | 'grid';

export interface SpatialRoom {
  id: string;
  roomId: string;
  layoutType: SpatialLayoutType;
  maxSeats: number;
}
