import { NextRequest } from "next/server";

const CORS_ALLOW_ORIGINS = [
  "http://localhost:55555",
  "https://claude-shannons-ultimate-machine.netlify.app"
] as const;
type CorsArrowOrigin = typeof CORS_ALLOW_ORIGINS[number];
const isCorsArrowOrigin = (origin: string | null): origin is CorsArrowOrigin => CORS_ALLOW_ORIGINS.find((corsAllowOrigin) => corsAllowOrigin == origin) !== undefined;

type Headers = {
  "Access-Control-Allow-Origin"?: string,
  "Access-Control-Allow-Methods"?: string,
  "Access-Control-Allow-Headers"?: string,
}

/**
 * ブラウザでアプリを動かすために必要な設定。
 */
export const corsHeaders = (req: NextRequest): Headers => {
  const origin = req.headers.get("Origin");
  if (!isCorsArrowOrigin(origin)) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
};
