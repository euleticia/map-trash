export type LatLng = { latitude: number; longitude: number };

export type CollectionRoute = {
  id: string;
  name: string; // ex.: "Rota 12 — Vila Mariana"
  type: 'domiciliar' | 'seletiva';
  weekdays: number[]; // 0 = domingo
  departureTime: string; // "19:00" — horário de saída da garagem
  path: LatLng[]; // sequência de pontos da rota
  avgSpeedKmh: number; // usado quando não há GPS
};

export type TruckPosition = {
  truckId: string;
  routeId: string;
  position: LatLng;
  pathIndex: number; // ponto atual da rota
  updatedAt: string; // ISO
};

export interface CollectionApi {
  getRoutes(): Promise<CollectionRoute[]>;
  getTruckPosition(routeId: string): Promise<TruckPosition | null>;
}
