import { CollectionApi } from './types';
import { mockRoutes } from '../../mocks/routes';
import { pathDistanceKm } from '../../shared/utils/geo';

function minutesSinceDeparture(departure: string): number {
  const [h, m] = departure.split(':').map(Number);
  const now = new Date();
  const start = new Date(now);
  start.setHours(h, m, 0, 0);
  return (now.getTime() - start.getTime()) / 60000;
}

/** Simula o GPS: posição calculada a partir do horário de saída e da velocidade média. */
export const mockApi: CollectionApi = {
  async getRoutes() {
    return mockRoutes;
  },
  async getTruckPosition(routeId) {
    const route = mockRoutes.find((r) => r.id === routeId);
    if (!route) return null;
    if (!route.weekdays.includes(new Date().getDay())) return null; // sem coleta hoje
    const elapsed = minutesSinceDeparture(route.departureTime);
    if (elapsed < 0) return null; // ainda não saiu
    const kmDone = (elapsed / 60) * route.avgSpeedKmh;
    let index = 0;
    while (index < route.path.length - 1 && pathDistanceKm(route.path, 0, index + 1) <= kmDone) index++;
    return {
      truckId: 'caminhao-01',
      routeId,
      position: route.path[index],
      pathIndex: index,
      updatedAt: new Date().toISOString(),
    };
  },
};
