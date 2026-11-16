import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function notifyTruckNear(minutes: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'O caminhão de lixo está chegando',
      body: `Previsão: cerca de ${minutes} min. Hora de colocar o lixo para fora.`,
    },
    trigger: null, // dispara agora
  });
}
