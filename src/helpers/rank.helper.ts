import { kv } from "@vercel/kv";

export type Rank = {
    time: string;
};


export const APP_TYPES = ["desktop", "mobile", "browser"] as const;
export type AppType = typeof APP_TYPES[number];
export const EmptyRank = {
    time: "00:00:00"
} as const satisfies Rank;

export type TopThree = [Rank, Rank, Rank];

export const EmptyTopThree = [
    EmptyRank,
    EmptyRank,
    EmptyRank,
] as const satisfies TopThree;

export type GetRanksResponse = {
    desktop: TopThree;
    mobile: TopThree;
    browser: TopThree;
};

export const INITIAL_RANKS = {
    desktop: EmptyTopThree,
    mobile: EmptyTopThree,
    browser: EmptyTopThree,
} as const satisfies GetRanksResponse;

export type PostRankRequest = {
    time: string;
    type: AppType;
}

export const insertTopThree = (rank: Rank, topThree: TopThree): TopThree => 
    [...topThree, rank].sort((rank1, rank2) => rank2.time.localeCompare(rank1.time)).slice(0, 3) as TopThree;

const RANKING_KEY = "ranking" as const;

export const loadRanks = async () : Promise<GetRanksResponse> => {
    return (await kv.get<GetRanksResponse>(RANKING_KEY)) ?? INITIAL_RANKS;
}

export const saveRanks = async (ranks: GetRanksResponse) => {
    kv.set(RANKING_KEY, ranks);
};
