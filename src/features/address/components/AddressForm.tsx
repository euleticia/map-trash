import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { useAddressStore } from '../store/addressStore';
import { colors } from '../../../shared/theme';

export const DEMO_ADDRESS = {
  label: 'Endereço de teste — Vila Mariana',
  coords: { latitude: -23.5921, longitude: -46.6405 },
};

export function AddressForm({ onDone }: { onDone: () => void }) {
  const { getLocation, loading, error } = useCurrentLocation();
  const setAddress = useAddressStore((s) => s.setAddress);

  async function useMyLocation() {
    const coords = await getLocation();
    if (coords) {
      setAddress('Minha localização', coords);
      onDone();
    }
  }

  function useDemo() {
    setAddress(DEMO_ADDRESS.label, DEMO_ADDRESS.coords);
    onDone();
  }

  return (
    <View style={{ gap: 12 }}>
      <Pressable style={styles.button} onPress={useMyLocation} disabled={loading}>
        <Text style={styles.text}>{loading ? 'Localizando...' : 'Usar minha localização'}</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.secondary]} onPress={useDemo}>
        <Text style={styles.text}>Usar endereço de teste</Text>
      </Pressable>
      {error && <Text style={{ color: colors.danger }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, alignItems: 'center' },
  secondary: { backgroundColor: colors.secondary },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
