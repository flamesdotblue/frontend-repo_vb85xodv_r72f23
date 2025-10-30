export default function FinalResults({ likes, dislikes, recommendations, onRestart, onShare }) {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">Your New Discovery Playlist!</h2>
        <p className="mt-3 text-neutral-700">
          Based on your answers and feedback ({likes} Likes and {dislikes} Dislikes), here are 5 song recommendations tailored just for you.
        </p>

        <div className="mt-8 grid gap-4">
          {recommendations.map((t) => (
            <div key={t.id} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-neutral-900">{t.title}</div>
                  <div className="text-neutral-700">{t.artist}</div>
                </div>
                <audio controls className="w-full md:w-80">
                  <source src={t.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button onClick={onRestart} className="flex-1 rounded-xl bg-neutral-900 px-5 py-3 text-white font-semibold hover:bg-black transition">Start Over</button>
          <button onClick={onShare} className="flex-1 rounded-xl bg-red-500 px-5 py-3 text-white font-semibold hover:bg-red-600 transition">Share Your Results</button>
        </div>
      </div>
    </section>
  );
}
