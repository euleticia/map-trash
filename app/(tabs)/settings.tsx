import { Text, Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { useAddressStore } from '../../src/features/address/store/addressStore';
import { colors } from '../../src/shared/theme';

const OPTIONS = [5, 10, 15, 30];

export default function Settings() {
  const label = useAddressStore((s) => s.label);
  const alertMinutes = useAddressStore((s) => s.alertMinutes);
  const setAlertMinutes = useAddressStore((s) => s.setAlertMinutes);
  const clear = useAddressStore((s) => s.clear);

  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Text style={{ fontSize: 16 }}>Endereço: {label}</Text>
      <Text style={{ fontSize: 16 }}>Avisar com antecedência de:</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {OPTIONS.map((m) => (
          <Pressable
            key={m}
            onPress={() => setAlertMinutes(m)}
            style={{ padding: 12, borderRadius: 8, backgroundColor: m === alertMinutes ? colors.primary : colors.muted }}
          >
            <Text style={{ color: m === alertMinutes ? '#fff' : '#000' }}>{m} min</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        onPress={() => {
          clear();
          router.replace('/onboarding');
        }}
      >
        <Text style={{ color: colors.danger, fontSize: 16 }}>Trocar endereço</Text>
      </Pressable>
    </View>
  );
}
