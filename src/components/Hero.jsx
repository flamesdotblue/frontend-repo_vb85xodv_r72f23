import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle radial overlay for contrast without blocking interactions */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0)_0%,rgba(2,6,23,0.35)_55%,rgba(2,6,23,0.85)_100%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/80 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-purple-400" /> Live AI music matcher
        </span>
        <h1 className="font-display bg-gradient-to-r from-purple-300 via-indigo-200 to-amber-200 bg-clip-text text-5xl font-semibold text-transparent sm:text-6xl">
          MusicMatch AI
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-white/80">
          A smart, minimal hub that learns your vibe and recommends songs you’ll actually love. Answer a few quick
          questions to start your personalized discovery.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 font-medium text-slate-900 shadow-lg shadow-purple-500/20 transition hover:bg-white"
          >
            Start Quiz
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}
