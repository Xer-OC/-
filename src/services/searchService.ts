import { mockServer } from '../api/mockServer';
import { rooms } from '../data/mock';
import { starterFarm } from '../data/mock';
import { getUnifiedFeed } from './videoFeedService';

export async function searchAll(query: string) {
  const term = query.trim().toLowerCase();
  const videos = await getUnifiedFeed();

  return {
    users: mockServer.users.filter((user) => user.displayName.toLowerCase().includes(term) || user.username.toLowerCase().includes(term)),
    rooms: rooms.filter((room) => room.name.toLowerCase().includes(term)),
    farms: [starterFarm].filter((farm) => farm.pet.toLowerCase().includes(term) || farm.id.includes(term)),
    videos: videos.filter((video) => video.title.toLowerCase().includes(term) || video.creator.toLowerCase().includes(term))
  };
}
