import { CollectionRoute, LatLng, TruckPosition } from '../../../services/api/types';
import { nearestIndex, pathDistanceKm } from '../../../shared/utils/geo';

export type Eta =
  | { status: 'not-today' }
  | { status: 'waiting-departure'; arrivesAt: Date }
  | { status: 'on-the-way'; minutes: number; arrivesAt: Date }
  | { status: 'passed' };

export function computeEta(
  route: CollectionRoute,
  home: LatLng,
  truck: TruckPosition | null,
  now: Date = new Date(),
): Eta {
  if (!route.weekdays.includes(now.getDay())) return { status: 'not-today' };

  const homeIndex = nearestIndex(route.path, home);
  const speed = route.avgSpeedKmh;
  const [h, m] = route.departureTime.split(':').map(Number);
  const departure = new Date(now);
  departure.setHours(h, m, 0, 0);
  const minutesFromStart = (pathDistanceKm(route.path, 0, homeIndex) / speed) * 60;

  // Sem GPS: horário de saída + tempo até o ponto do endereço.
  if (!truck) {
    const arrivesAt = new Date(departure.getTime() + minutesFromStart * 60000);
    // Já saiu e o horário estimado ficou para trás, mas não há posição: considera que passou.
    if (now > departure && now > arrivesAt) return { status: 'passed' };
    return { status: 'waiting-departure', arrivesAt };
  }

  // Com GPS: distância pela rota entre o caminhão e o endereço.
  if (truck.pathIndex > homeIndex) return { status: 'passed' };
  const minutes = Math.round((pathDistanceKm(route.path, truck.pathIndex, homeIndex) / speed) * 60);
  return { status: 'on-the-way', minutes, arrivesAt: new Date(now.getTime() + minutes * 60000) };
}
