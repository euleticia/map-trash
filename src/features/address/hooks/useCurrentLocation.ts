import { useState } from 'react';
import * as Location from 'expo-location';
import { LatLng } from '../../../services/api/types';

export function useCurrentLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getLocation(): Promise<LatLng | null> {
    setLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permissão de localização negada');
        return null;
      }
      const pos = await Location.getCurrentPositionAsync({});
      return { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
    } catch {
      setError('Não foi possível obter sua localização');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { getLocation, loading, error };
}
