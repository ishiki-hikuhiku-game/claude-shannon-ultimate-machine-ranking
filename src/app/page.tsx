"use client";
import useSWR from "swr";
import { APP_TYPES, GetRanksResponse } from "../helpers/rank.helper";

const fetcher = async () => {
  const response = await fetch("/api/ranks");
  return (await response.json()) as GetRanksResponse;
};

export default function Home() {
  const { data, error, isLoading, mutate } = useSWR("/api/user", fetcher);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {data !== undefined &&
          APP_TYPES.map((appType) => (
            <div key={`list-${appType}`}>
              <h2>{appType}</h2>
              <ol>
                {data[appType].map((rank, i) => (
                  <li key={`browser-${i}`}>{rank.time}</li>
                ))}
              </ol>
            </div>
          ))}
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            fetch("/api/ranks", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "browser",
                time: "00:10:00",
              }),
            }).then(() => {
              mutate();
            });
          }}
        >
          変更
        </button>
      </div>
    </main>
  );
}
