import { CollectionApi } from './types';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API ${path} respondeu ${res.status}`);
  return res.json() as Promise<T>;
}

export const realApi: CollectionApi = {
  getRoutes: () => getJson('/routes'),
  async getTruckPosition(routeId) {
    try {
      return await getJson(`/routes/${routeId}/truck`);
    } catch (e) {
      if (e instanceof Error && e.message.endsWith('404')) return null; // caminhão sem posição
      throw e;
    }
  },
};
