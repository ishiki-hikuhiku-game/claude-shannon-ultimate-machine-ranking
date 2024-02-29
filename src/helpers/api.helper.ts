/**
 * ブラウザでアプリを動かすために必要な設定。
 * TODO 本番用のORIGINも設定する
 */
export const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "http://localhost:55555,https://claude-shannons-ultimate-machine.netlify.app",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  } as const;