/**
 * ブラウザでアプリを動かすために必要な設定。
 * TODO 本番用のORIGINも設定する
 */
export const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "http://localhost:55555",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  } as const;