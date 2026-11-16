import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api/client';
import { CollectionRoute, LatLng } from '../../../services/api/types';
import { computeEta } from '../utils/eta';

export function useTruckEta(route: CollectionRoute | null | undefined, home: LatLng | null) {
  const truck = useQuery({
    queryKey: ['truck', route?.id],
    queryFn: () => api.getTruckPosition(route!.id),
    enabled: !!route,
    refetchInterval: 30_000, // atualiza a cada 30 s
  });

  const eta = route && home ? computeEta(route, home, truck.data ?? null) : null;
  return { eta, truck: truck.data ?? null, isLoading: truck.isLoading };
}
