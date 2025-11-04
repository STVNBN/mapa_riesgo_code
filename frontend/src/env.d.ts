// src/env.d.ts
interface ImportMetaEnv {
  readonly NG_APP_AUTH0_DOMAIN: string;
  readonly NG_APP_AUTH0_CLIENT_ID: string;
  readonly NG_APP_AUTH0_AUDIENCE: string;
  readonly NG_APP_API_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
