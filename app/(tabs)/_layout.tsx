import { Tabs } from 'expo-router';
import { colors } from '../../src/shared/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary }}>
      <Tabs.Screen name="home" options={{ title: 'Previsão' }} />
      <Tabs.Screen name="settings" options={{ title: 'Ajustes' }} />
    </Tabs>
  );
}
