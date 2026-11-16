# Quando passa o lixo? — protótipo

App Expo (Android e iOS) que mostra quando o caminhão de lixo passa na sua rua. Enquanto a API da prefeitura não existe, usa uma API simulada com o mesmo contrato (`src/services/api/types.ts`).

## Rodar

```bash
npm install
npx expo start
```

Abra no celular com o Expo Go e toque em **Usar endereço de teste**.

Para ver o caminhão andando, mude `departureTime` em `src/mocks/routes.ts` para alguns minutos antes da hora atual (a rota tem coleta de segunda a sábado).

## API real

Copie `.env.example` para `.env` e defina `EXPO_PUBLIC_USE_MOCK=false` e `EXPO_PUBLIC_API_URL`. A troca acontece só em `src/services/api/client.ts`.

## Verificações

```bash
npm run typecheck
npm test
```

## Limitações do protótipo

- O alerta de proximidade só dispara com o app aberto. Com o app fechado, é preciso push pelo backend (Expo Push).
- A associação endereço → rota usa o ponto da rota mais próximo (até 500 m).
