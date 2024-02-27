import { APP_TYPES, loadRanks } from "../helpers/rank.helper";

export default async function Home() {
  const data = await loadRanks();

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
    </main>
  );
}
