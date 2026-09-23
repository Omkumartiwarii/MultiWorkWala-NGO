/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_MOCK_LATENCY_MS?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_DONATION_UPI_ID?: string;
  readonly VITE_DONATION_PAYEE_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
