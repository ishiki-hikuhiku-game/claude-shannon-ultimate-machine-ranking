/*
 * kvはvercelのキーバリューデータベースで
 * 招待はredis。
 * 
 * なので、kvを使わなくなった場合は、他のredisに接続しなおせば良い。
 */
import { kv } from "@vercel/kv";
import { unstable_noStore as noStore } from 'next/cache';

export type Rank = {
    time: string;
    datetime: string;
};


export const APP_TYPES = ["desktop", "mobile", "browser"] as const;
export type AppType = typeof APP_TYPES[number];
export const TRANSLATE_MAP: {[appType in AppType]: string} = {
    desktop: "デスクトップ",
    mobile: "スマートフォン",
    browser: "ブラウザ",
} as const;
export const EMPTY_RANK = {
    time: "00:00:00",
    datetime: "0000-00-00T00:00:00",
} as const satisfies Rank;

export type TopThree = [Rank, Rank, Rank];

export const EmptyTopThree = [
    EMPTY_RANK,
    EMPTY_RANK,
    EMPTY_RANK,
] as const satisfies TopThree;

export type Ranks = {
    desktop: TopThree;
    mobile: TopThree;
    browser: TopThree;
    month: string;
};

export const initialRanks = (now: Date): Ranks => {
    return {
        desktop: EmptyTopThree,
        mobile: EmptyTopThree,
        browser: EmptyTopThree,
        month: `${now.getFullYear()}-${now.getMonth() + 1}`
    };
};

export type PostRankRequest = {
    time: string;
    type: AppType;
}

export const insertTopThree = (rank: Rank, topThree: TopThree): TopThree => 
    [...topThree, rank].sort((rank1, rank2) => rank2.time.localeCompare(rank1.time)).slice(0, 3) as TopThree;

const RANKING_KEY = "ranking" as const;

export const loadRanks = async () : Promise<Ranks> => {
    noStore(); // これをしないとキャッシュされて最新の結果が取れない。
    const ranks = await kv.get<Ranks>(RANKING_KEY);
    const now = new Date();
    if (ranks == null) {
        return initialRanks(now);
    }
    const past = new Date(ranks.month);
    const nowYear = now.getFullYear();
    const pastYear = past.getFullYear();
    if (nowYear > pastYear) { // 年が変わっていたら新しいランクを作成
        return initialRanks(now);
    }
    if (nowYear == pastYear && now.getMonth() > past.getMonth()) { // 月が変わっていたら新しいランクを作成
        return initialRanks(now);
    }
    return ranks;
}

export const saveRanks = async (ranks: Ranks) => {
    await kv.set(RANKING_KEY, ranks);
};
