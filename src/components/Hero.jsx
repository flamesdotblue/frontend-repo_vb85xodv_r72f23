import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero({ onStart }) {
  const [artist, setArtist] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!artist.trim()) return;
    onStart(artist.trim());
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* gradient veil to improve text contrast without blocking interaction */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6">
        <div className="rounded-2xl border border-neutral-200/60 bg-white/70 backdrop-blur-xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Welcome to The Music Matchmaker.
          </h1>
          <p className="mt-3 md:mt-4 text-neutral-700 text-base md:text-lg">
            Let’s find your next favorite song.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:gap-5">
            <label className="text-sm md:text-base text-neutral-800">
              Please enter the name of a band or artist you absolutely love right now.
            </label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="e.g., Tame Impala"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-400/60"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-red-500 px-5 py-3 text-white font-medium shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
            >
              Start Matching!
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
