import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api/client';
import { CollectionRoute, LatLng } from '../../../services/api/types';
import { distanceKm, nearestIndex } from '../../../shared/utils/geo';

const MAX_DISTANCE_KM = 0.5; // endereço até 500 m da rota

export function useRouteForAddress(home: LatLng | null) {
  return useQuery({
    queryKey: ['routes'],
    queryFn: () => api.getRoutes(),
    enabled: !!home,
    select: (routes): CollectionRoute | null => {
      if (!home) return null;
      let best: CollectionRoute | null = null;
      let bestDist = Infinity;
      for (const r of routes) {
        const d = distanceKm(r.path[nearestIndex(r.path, home)], home);
        if (d < bestDist) {
          bestDist = d;
          best = r;
        }
      }
      return bestDist <= MAX_DISTANCE_KM ? best : null;
    },
  });
}
