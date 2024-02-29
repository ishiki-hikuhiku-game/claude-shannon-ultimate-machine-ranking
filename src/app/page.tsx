import { APP_TYPES, TRANSLATE_MAP, loadRanks } from "../helpers/rank.helper";

export default async function Home() {
  const data = await loadRanks();

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <h1 className="p-2 w-screen bg-slate-100">
        シャノンの究極のマシン生存期間ランキング
      </h1>
      <main className="flex flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {data !== undefined &&
            APP_TYPES.map((appType) => (
              <div key={`list-${appType}`} className="mb-5">
                <h2>{TRANSLATE_MAP[appType]}</h2>
                <ol>
                  {data[appType].map((rank, i) => (
                    <li key={`browser-${i}`}>{rank.time}</li>
                  ))}
                </ol>
              </div>
            ))}
        </div>
        <div className="w-screen p-5">
          <p>全ての始まり、何も無かった。</p>
          <p>無は思った。「無も無い」と。</p>
          <p>そこで無は言った。「何か有れ」と。</p>
          <p>すると、有った。</p>
          <p>無はそれを見てよしとしたが、すでに無は無かった。</p>
          <p>代わりに有がそれを見て、思った。</p>
          <p>「無が無い」と。そこで有は言った。「無、有れ」と。</p>
          <p>すると、全て無になった。</p>
          <p>無はそれを見てよしとしたが、すでに有も無かった。</p>
          <p>第一日である。</p>
          <p>
            こうして無は何度も何度も有に有れと言い、有はその度にそれを無とした。
          </p>
          <p>様々な工夫により、有が無となるまでの期間は長くなっていった。</p>
          <p>
            今回、無が有になってから、地球人類の時間で138億年経ってもまだ無にはなっていない。
          </p>
          <p>
            情報学者のクロード・シャノンとマーヴィン・ミンスキーが作った、「ONにすると自分をOFFにする機械」をアーサー・C・クラークが目に留めて文章に残している。
          </p>
          <p>彼はそれが宇宙の模型であることには気が付かなかったようだ。</p>
        </div>
      </main>
      <footer id="credit" className="bg-black w-screen">
        <p className="text-white">
          制作：
          <a href="https://github.com/ishiki-hikuhiku-game">
            意識ひくひくゲーム制作同好会
          </a>
          <br />
          （代表：淡中圏 &lt;tannakaken@gmail.com&gt;）
        </p>
      </footer>
    </div>
  );
}
