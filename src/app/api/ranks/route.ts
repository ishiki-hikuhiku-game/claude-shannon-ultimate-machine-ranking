import { NextRequest, NextResponse } from "next/server";
import { EmptyTopThree, GetRanksResponse, PostRankRequest, insertTopThree } from "@/helpers/rank.helper";

const loadRanks = async (): Promise<GetRanksResponse> => {
    return {
        desktop: EmptyTopThree,
        mobile: EmptyTopThree,
        browser: EmptyTopThree,
    };
}

const saveRanks = async (ranks: GetRanksResponse) => 
    {};



/**
 * 現在のランキングを返す。
 */
export const GET = async (req: NextRequest) => {
    const ranks = await loadRanks();
    return NextResponse.json<GetRanksResponse>(ranks, { status: 200 });
};


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
      });
}
