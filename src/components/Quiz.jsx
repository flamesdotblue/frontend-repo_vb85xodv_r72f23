import React, { useMemo, useState } from 'react';

const GENRES = [
  'Pop',
  'Rock',
  'Hip-Hop',
  'Electronic',
  'R&B',
  'Indie',
  'Jazz',
  'Classical',
];

const MOODS = ['Chill', 'Happy', 'Moody', 'Energetic', 'Focus'];
const TEMPOS = ['Slow', 'Medium', 'Fast'];
const INSTRUMENTS = ['Guitar', 'Piano', 'Synth', 'Drums', 'Strings', 'Bass'];

export default function Quiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    artist: '',
    genres: [],
    mood: 'Chill',
    tempo: 'Medium',
    instruments: [],
  });

  const steps = useMemo(
    () => [
      {
        label: 'Favorite artist',
        content: (
          <div className="space-y-3">
            <label className="text-sm text-white/70">Type an artist you love</label>
            <input
              type="text"
              value={answers.artist}
              onChange={(e) => setAnswers((a) => ({ ...a, artist: e.target.value }))}
              placeholder="e.g., Billie Eilish, The Weeknd"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-purple-400/50"
            />
          </div>
        ),
        canContinue: answers.artist.trim().length > 1,
      },
      {
        label: 'Pick your genres',
        content: (
          <div className="space-y-3">
            <label className="text-sm text-white/70">Choose 1–3 genres</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {GENRES.map((g) => {
                const active = answers.genres.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setAnswers((a) => {
                        const set = new Set(a.genres);
                        if (set.has(g)) set.delete(g);
                        else if (set.size < 3) set.add(g);
                        return { ...a, genres: Array.from(set) };
                      });
                    }}
                    className={`rounded-xl border px-3 py-2 text-sm transition ${
                      active
                        ? 'border-purple-400/50 bg-purple-400/10 text-white'
                        : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>
        ),
        canContinue: answers.genres.length >= 1,
      },
      {
        label: 'Mood & tempo',
        content: (
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/70">Mood</label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, mood: m }))}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      answers.mood === m
                        ? 'bg-indigo-400/20 text-white ring-1 ring-indigo-300/40'
                        : 'bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/70">Tempo</label>
              <div className="flex flex-wrap gap-2">
                {TEMPOS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, tempo: t }))}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      answers.tempo === t
                        ? 'bg-amber-400/20 text-white ring-1 ring-amber-300/40'
                        : 'bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ),
        canContinue: true,
      },
      {
        label: 'Instruments you enjoy',
        content: (
          <div>
            <label className="mb-2 block text-sm text-white/70">Pick any</label>
            <div className="flex flex-wrap gap-2">
              {INSTRUMENTS.map((ins) => {
                const active = answers.instruments.includes(ins);
                return (
                  <button
                    key={ins}
                    type="button"
                    onClick={() =>
                      setAnswers((a) => {
                        const set = new Set(a.instruments);
                        if (set.has(ins)) set.delete(ins);
                        else set.add(ins);
                        return { ...a, instruments: Array.from(set) };
                      })
                    }
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      active
                        ? 'bg-teal-400/20 text-white ring-1 ring-teal-300/40'
                        : 'bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {ins}
                  </button>
                );
              })}
            </div>
          </div>
        ),
        canContinue: true,
      },
    ],
    [answers]
  );

  const percent = Math.round(((step + 1) / steps.length) * 100);

  return (
    <section className="relative mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-white shadow-2xl backdrop-blur xl:p-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white/90">{steps[step].label}</h3>
          <span className="text-sm text-white/60">{step + 1} / {steps.length}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-amber-300" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="min-h-[160px]">{steps[step].content}</div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => steps[step].canContinue && setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={!steps[step].canContinue}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-slate-900 shadow-lg shadow-purple-500/20 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onComplete(answers)}
            className="rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-amber-300 px-6 py-2.5 text-sm font-medium text-slate-900 shadow-lg shadow-purple-500/20 transition hover:brightness-110"
          >
            See recommendations
          </button>
        )}
      </div>
    </section>
  );
}
