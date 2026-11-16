import { View, Text, StyleSheet } from 'react-native';
import { Eta } from '../utils/eta';
import { colors } from '../../../shared/theme';

const fmt = (d: Date) => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

export function EtaCard({ eta, routeName }: { eta: Eta | null; routeName: string }) {
  let title = 'Carregando...';
  let subtitle = '';

  if (eta?.status === 'not-today') title = 'Sem coleta hoje';
  if (eta?.status === 'waiting-departure') {
    title = `Previsão: ${fmt(eta.arrivesAt)}`;
    subtitle = 'O caminhão ainda não saiu';
  }
  if (eta?.status === 'on-the-way') {
    title = eta.minutes <= 1 ? 'Chegando agora' : `Chega em ~${eta.minutes} min`;
    subtitle = `Por volta das ${fmt(eta.arrivesAt)}`;
  }
  if (eta?.status === 'passed') title = 'O caminhão já passou hoje';

  return (
    <View style={styles.card}>
      <Text style={styles.route}>{routeName}</Text>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 16, backgroundColor: colors.primaryDark },
  route: { color: colors.primarySoft, fontSize: 14 },
  title: { color: '#fff', fontSize: 28, fontWeight: '700', marginTop: 4 },
  subtitle: { color: colors.primaryFaint, fontSize: 16, marginTop: 4 },
});
