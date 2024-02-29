const CORS_ARROW_ORIGINS = [
  "http://localhost:55555",
  "https://claude-shannons-ultimate-machine.netlify.app"
] as const;

const corsArrowOrigin = (url: string) => 
  CORS_ARROW_ORIGINS.find((origin) => url.startsWith(origin));

type Headers = {
  "Access-Control-Allow-Origin"?: string,
  "Access-Control-Allow-Methods"?: string,
  "Access-Control-Allow-Headers"?: string,
}

/**
 * ブラウザでアプリを動かすために必要な設定。
 * TODO 本番用のORIGINも設定する
 */
export const corsHeaders = (url: string): Headers => {
  const origin = corsArrowOrigin(url);
  if (origin === undefined) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
};
