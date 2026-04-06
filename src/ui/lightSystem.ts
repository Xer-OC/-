export const topLight = {
  start: { x: 0.15, y: 0 },
  end: { x: 0.85, y: 1 },
  colors: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']
} as const;

export const ambientLight = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  colors: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.02)']
} as const;

export const accentLight = {
  start: { x: 1, y: 0 },
  end: { x: 0, y: 1 },
  colors: ['rgba(186,230,253,0.2)', 'rgba(186,230,253,0.02)']
} as const;
