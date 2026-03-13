import { mockServer } from '../api/mockServer';

export function getItems() {
  return mockServer.items;
}

export function getItemById(id: string) {
  return mockServer.items.find((item) => item.id === id) ?? null;
}
