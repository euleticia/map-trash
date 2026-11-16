import { Text, View } from 'react-native';
import { useAddressStore } from '../../src/features/address/store/addressStore';
import { useRouteForAddress } from '../../src/features/collection/hooks/useRouteForAddress';
import { useTruckEta } from '../../src/features/collection/hooks/useTruckEta';
import { EtaCard } from '../../src/features/collection/components/EtaCard';
import { TruckMap } from '../../src/features/collection/components/TruckMap';
import { useProximityAlert } from '../../src/features/notifications/hooks/useProximityAlert';

const message = { padding: 24, fontSize: 16 } as const;

export default function Home() {
  const coords = useAddressStore((s) => s.coords);
  const label = useAddressStore((s) => s.label);
  const alertMinutes = useAddressStore((s) => s.alertMinutes);
  const route = useRouteForAddress(coords);
  const { eta, truck } = useTruckEta(route.data, coords);
  useProximityAlert(eta, alertMinutes);

  if (route.isLoading) return <Text style={message}>Buscando sua rota...</Text>;
  if (route.isError) return <Text style={message}>Não foi possível carregar as rotas. Tente de novo mais tarde.</Text>;
  if (!route.data || !coords)
    return <Text style={message}>Ainda não temos coleta mapeada para {label ?? 'este endereço'}.</Text>;

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <EtaCard eta={eta} routeName={route.data.name} />
      <TruckMap route={route.data} home={coords} truck={truck} />
    </View>
  );
}
