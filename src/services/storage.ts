import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

/** Armazenamento persistente usado pelos stores do Zustand. */
export const persistStorage = createJSONStorage(() => AsyncStorage);
