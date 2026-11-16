import { LatLng } from '../../services/api/types';

const toRad = (v: number) => (v * Math.PI) / 180;

/** Distância em linha reta entre dois pontos (fórmula de haversine). */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Índice do ponto da rota mais próximo de `point`. */
export function nearestIndex(path: LatLng[], point: LatLng): number {
  let best = 0;
  let bestDist = Infinity;
  path.forEach((p, i) => {
    const d = distanceKm(p, point);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

/** Distância percorrida pela rota entre os índices `from` e `to`. */
export function pathDistanceKm(path: LatLng[], from: number, to: number): number {
  let total = 0;
  for (let i = from; i < to; i++) total += distanceKm(path[i], path[i + 1]);
  return total;
}
