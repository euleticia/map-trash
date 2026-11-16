import { CollectionRoute } from '../services/api/types';

export const mockRoutes: CollectionRoute[] = [
  {
    id: 'rota-12',
    name: 'Rota 12 — Vila Mariana',
    type: 'domiciliar',
    weekdays: [1, 2, 3, 4, 5, 6],
    departureTime: '19:00',
    avgSpeedKmh: 12,
    path: [
      { latitude: -23.5869, longitude: -46.6346 },
      { latitude: -23.5882, longitude: -46.6362 },
      { latitude: -23.5895, longitude: -46.6378 },
      { latitude: -23.5908, longitude: -46.6391 },
      { latitude: -23.5921, longitude: -46.6405 },
      { latitude: -23.5934, longitude: -46.6419 },
      { latitude: -23.5947, longitude: -46.6433 },
      { latitude: -23.596, longitude: -46.6447 },
    ],
  },
];
