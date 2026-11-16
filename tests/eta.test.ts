import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeEta } from '../src/features/collection/utils/eta';
import { mockRoutes } from '../src/mocks/routes';
import { nearestIndex, pathDistanceKm } from '../src/shared/utils/geo';

const route = mockRoutes[0];
const home = { latitude: -23.5921, longitude: -46.6405 }; // ponto 4 da rota
// Segunda-feira, 16/11/2026
const at = (h: number, m: number) => new Date(2026, 10, 16, h, m);

test('endereço de teste fica no ponto 4 da rota', () => {
  assert.equal(nearestIndex(route.path, home), 4);
});

test('domingo: sem coleta', () => {
  assert.deepEqual(computeEta(route, home, null, new Date(2026, 10, 15, 19, 0)), { status: 'not-today' });
});

test('antes da saída: previsão = saída + tempo até a casa', () => {
  const eta = computeEta(route, home, null, at(18, 0));
  assert.equal(eta.status, 'waiting-departure');
  const expectedMin = (pathDistanceKm(route.path, 0, 4) / route.avgSpeedKmh) * 60;
  if (eta.status === 'waiting-departure')
    assert.ok(Math.abs(eta.arrivesAt.getTime() - (at(19, 0).getTime() + expectedMin * 60000)) < 1);
});

test('com GPS antes da casa: a caminho', () => {
  const truck = { truckId: 't', routeId: route.id, position: route.path[2], pathIndex: 2, updatedAt: '' };
  const eta = computeEta(route, home, truck, at(19, 3));
  assert.equal(eta.status, 'on-the-way');
  if (eta.status === 'on-the-way') assert.ok(eta.minutes > 0 && eta.minutes < 10);
});

test('com GPS depois da casa: já passou', () => {
  const truck = { truckId: 't', routeId: route.id, position: route.path[6], pathIndex: 6, updatedAt: '' };
  assert.deepEqual(computeEta(route, home, truck, at(19, 20)), { status: 'passed' });
});
