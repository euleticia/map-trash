import { View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { CollectionRoute, LatLng, TruckPosition } from '../../../services/api/types';
import { colors } from '../../../shared/theme';

type Props = { route: CollectionRoute; home: LatLng; truck: TruckPosition | null };

export function TruckMap({ route, home, truck }: Props) {
  return (
    <View style={{ flex: 1, borderRadius: 16, overflow: 'hidden' }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{ ...home, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
      >
        <Polyline coordinates={route.path} strokeWidth={4} strokeColor={colors.primary} />
        <Marker coordinate={home} title="Sua casa" pinColor="blue" />
        {truck && <Marker coordinate={truck.position} title="Caminhão de lixo" pinColor="green" />}
      </MapView>
    </View>
  );
}
