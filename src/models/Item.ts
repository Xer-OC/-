export interface Item {
  id: string;
  name: string;
  effect: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
