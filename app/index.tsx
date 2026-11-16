import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAddressStore } from '../src/features/address/store/addressStore';
import { colors } from '../src/shared/theme';

/** Espera o endereço salvo carregar do AsyncStorage antes de decidir a tela inicial. */
function useHydrated() {
  const [hydrated, setHydrated] = useState(useAddressStore.persist.hasHydrated());
  useEffect(() => {
    const unsub = useAddressStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useAddressStore.persist.hasHydrated());
    return unsub;
  }, []);
  return hydrated;
}

export default function Index() {
  const hydrated = useHydrated();
  const coords = useAddressStore((s) => s.coords);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }
  return <Redirect href={coords ? '/home' : '/onboarding'} />;
}
