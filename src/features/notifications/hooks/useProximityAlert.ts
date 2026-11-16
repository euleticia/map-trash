import { useEffect, useRef } from 'react';
import { Eta } from '../../collection/utils/eta';
import { notifyTruckNear } from '../services/notify';

/** Dispara uma notificação por coleta quando o caminhão fica a `alertMinutes` ou menos. */
export function useProximityAlert(eta: Eta | null, alertMinutes: number) {
  const sent = useRef(false);

  useEffect(() => {
    if (!eta || eta.status !== 'on-the-way') {
      if (eta?.status === 'passed' || eta?.status === 'not-today') sent.current = false;
      return;
    }
    if (!sent.current && eta.minutes <= alertMinutes) {
      sent.current = true;
      notifyTruckNear(eta.minutes).catch(() => {
        sent.current = false;
      });
    }
  }, [eta, alertMinutes]);
}
