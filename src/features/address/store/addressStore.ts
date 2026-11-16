import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LatLng } from '../../../services/api/types';
import { persistStorage } from '../../../services/storage';

type AddressState = {
  label: string | null;
  coords: LatLng | null;
  alertMinutes: number;
  setAddress: (label: string, coords: LatLng) => void;
  setAlertMinutes: (m: number) => void;
  clear: () => void;
};

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      label: null,
      coords: null,
      alertMinutes: 10,
      setAddress: (label, coords) => set({ label, coords }),
      setAlertMinutes: (alertMinutes) => set({ alertMinutes }),
      clear: () => set({ label: null, coords: null }),
    }),
    { name: 'address', storage: persistStorage },
  ),
);
