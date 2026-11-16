import { CollectionApi } from './types';
import { mockApi } from './mockApi';
import { realApi } from './realApi';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK !== 'false';

/** Único ponto que decide a fonte de dados: mock ou API da prefeitura. */
export const api: CollectionApi = USE_MOCK ? mockApi : realApi;
