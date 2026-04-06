import { Seat } from '../models/Seat';

function toSeat(roomId: string, userId: string, index: number, x: number, y: number, angle: number): Seat {
  return {
    seatId: `${roomId}-seat-${index + 1}`,
    roomId,
    userId,
    positionX: x,
    positionY: y,
    angle
  };
}

export function generateCircleLayout(roomId: string, userIds: string[], radius = 132, cx = 0, cy = 0): Seat[] {
  return userIds.map((userId, index) => {
    const theta = (index / userIds.length) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(theta) * radius;
    const y = cy + Math.sin(theta) * radius;
    return toSeat(roomId, userId, index, x, y, (theta * 180) / Math.PI + 90);
  });
}

export function generateGridLayout(roomId: string, userIds: string[], columns = 4, gapX = 88, gapY = 84): Seat[] {
  const rowCount = Math.ceil(userIds.length / columns);
  return userIds.map((userId, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const offsetX = ((columns - 1) * gapX) / 2;
    const offsetY = ((rowCount - 1) * gapY) / 2;
    return toSeat(roomId, userId, index, col * gapX - offsetX, row * gapY - offsetY, 0);
  });
}

export function generateTheaterLayout(roomId: string, userIds: string[], columns = 4, rowGap = 72, colGap = 92): Seat[] {
  const rows = Math.ceil(userIds.length / columns);
  return userIds.map((userId, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const rowColumns = Math.min(columns, userIds.length - row * columns);
    const centerOffset = ((rowColumns - 1) * colGap) / 2;
    const x = col * colGap - centerOffset;
    const y = row * rowGap - ((rows - 1) * rowGap) / 2;
    const angle = ((col - (rowColumns - 1) / 2) / Math.max(1, rowColumns)) * 22;
    return toSeat(roomId, userId, index, x, y, angle);
  });
}
