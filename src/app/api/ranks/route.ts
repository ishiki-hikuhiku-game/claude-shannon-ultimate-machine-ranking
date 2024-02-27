import { NextRequest } from "next/server";
import { PostRankRequest, insertTopThree, loadRanks, saveRanks } from "@/helpers/rank.helper";
import { CORS_HEADERS } from "@/helpers/api.helper";

/**
 * ランキングに新しい情報を入れる。
 */
export const POST = async (req: NextRequest) => {
    const rank = await req.json() as PostRankRequest;
    const ranks = await loadRanks();
    ranks[rank.type] = insertTopThree(rank, ranks[rank.type]);
    await saveRanks(ranks);
    return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
}
