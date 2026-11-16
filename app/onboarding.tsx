import { Text } from 'react-native';
import { router } from 'expo-router';
import { AddressForm } from '../src/features/address/components/AddressForm';
import { requestPermission } from '../src/features/notifications/services/notify';
import { Screen } from '../src/shared/components/Screen';
import { colors } from '../src/shared/theme';

export default function Onboarding() {
  async function finish() {
    await requestPermission().catch(() => false);
    router.replace('/home');
  }

  return (
    <Screen style={{ padding: 24, justifyContent: 'center', gap: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text }}>Quando passa o lixo?</Text>
      <Text style={{ fontSize: 16, color: colors.textMuted }}>
        Informe seu endereço para saber quando o caminhão chega na sua rua.
      </Text>
      <AddressForm onDone={finish} />
    </Screen>
  );
}
