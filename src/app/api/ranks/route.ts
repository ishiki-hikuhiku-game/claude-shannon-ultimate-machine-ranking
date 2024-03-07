import { NextRequest, NextResponse } from "next/server";
import { PostRankRequest, insertTopThree, loadRanks, saveRanks } from "@/helpers/rank.helper";
import { corsHeaders } from "@/helpers/api.helper";

/**
 * ランキングに新しい情報を入れる。
 */
export const POST = async (req: NextRequest) => {
    const rank = await req.json() as PostRankRequest;
    const ranks = await loadRanks();
    const now = new Date();
    const nowString = now.toLocaleString("ja-JP", { timeZone: 'Asia/Tokyo' })
    ranks[rank.type] = insertTopThree({...rank, datetime: nowString}, ranks[rank.type]);
    await saveRanks(ranks);
    return new Response(null, {
        status: 204,
        headers: corsHeaders(req),
      });
}

export const OPTIONS = async (req: NextRequest) => {
    return NextResponse.json({}, { headers: corsHeaders(req) });
}