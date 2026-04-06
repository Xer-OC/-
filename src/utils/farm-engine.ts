import { Farm } from '../types/models';

const IDLE_RATE = 0.3;
const FEED_BOOST = 5;

export const applyIdleGrowth = (farm: Farm): Farm => {
  const now = Date.now();
  const minutes = Math.max((now - farm.lastUpdatedAt) / 60000, 0);
  const growth = Math.min(100, Number((farm.growth + minutes * IDLE_RATE).toFixed(1)));

  return { ...farm, growth, lastUpdatedAt: now };
};

export const feedFarm = (farm: Farm): Farm => {
  if (farm.foodStock <= 0) return farm;
  const withIdle = applyIdleGrowth(farm);
  return {
    ...withIdle,
    growth: Math.min(100, Number((withIdle.growth + FEED_BOOST).toFixed(1))),
    foodStock: withIdle.foodStock - 1,
    lastUpdatedAt: Date.now()
  };
};
