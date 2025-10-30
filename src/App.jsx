import React, { useMemo, useState } from 'react';
import Hero from './components/Hero.jsx';
import Quiz from './components/Quiz.jsx';
import Recommendations from './components/Recommendations.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [stage, setStage] = useState('welcome'); // 'welcome' | 'quiz' | 'results'
  const [answers, setAnswers] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const items = useMemo(() => {
    // Static demo list for now. In the full app, these would come from the backend/Spotify based on answers.
    const base = [
      {
        id: '1',
        title: 'Midnight Drive',
        artist: 'Neon Avenues',
        cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop',
        previewUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8c8f6e9f95.mp3?filename=future-bass-111064.mp3',
        tags: ['Electronic', 'Energetic', 'Synth'],
      },
      {
        id: '2',
        title: 'Gentle Waves',
        artist: 'Ocean Bloom',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
        previewUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_6f9c2e2d91.mp3?filename=lofi-study-111042.mp3',
        tags: ['Chill', 'Lo-fi', 'Slow'],
      },
      {
        id: '3',
        title: 'Sunset Avenue',
        artist: 'Indigo Street',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop',
        previewUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_0b0b0e2f72.mp3?filename=summer-walk-111049.mp3',
        tags: ['Indie', 'Happy', 'Guitar'],
      },
      {
        id: '4',
        title: 'City Lights',
        artist: 'Metro Pulse',
        cover: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=600&auto=format&fit=crop',
        previewUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7f5eab7c9a.mp3?filename=night-drive-111050.mp3',
        tags: ['R&B', 'Medium', 'Bass'],
      },
      {
        id: '5',
        title: 'Golden Hour',
        artist: 'Aurora Lane',
        cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop',
        previewUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_ba88a3b4a3.mp3?filename=golden-hour-111060.mp3',
        tags: ['Pop', 'Happy', 'Fast'],
      },
      {
        id: '6',
        title: 'Echoes & Dust',
        artist: 'Mono Bloom',
        cover: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop',
        previewUrl: 'https://cdn.pixabay.com/download/audio/2021/09/30/audio_9b9d7d9d1a.mp3?filename=ambient-10689.mp3',
        tags: ['Ambient', 'Focus', 'Slow'],
      },
    ];

    if (!answers) return base;

    // Lightweight, local scoring based on quiz answers to make the demo feel adaptive.
    const preferences = [
      answers.mood,
      answers.tempo,
      ...answers.genres,
      ...(answers.instruments || []),
    ]
      .filter(Boolean)
      .map((s) => s.toLowerCase());

    const scored = base
      .map((t) => {
        const score = t.tags.reduce((acc, tag) => (preferences.includes(tag.toLowerCase()) ? acc + 1 : acc), 0);
        return { ...t, score };
      })
      .sort((a, b) => b.score - a.score);

    return scored;
  }, [answers]);

  function handleQuizComplete(res) {
    setAnswers(res);
    setStage('results');
  }

  function handleFeedback({ track, action }) {
    setFeedback((prev) => [...prev, { id: track.id, action }]);
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {stage === 'welcome' && <Hero onStart={() => setStage('quiz')} />}

      <main className="relative z-10 mx-auto max-w-6xl px-6">
        {stage === 'welcome' && (
          <section id="how-it-works" className="mx-auto -mt-12 max-w-4xl rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-white backdrop-blur lg:-mt-20 lg:p-8">
            <h2 className="mb-3 text-xl font-semibold">How it works</h2>
            <ol className="grid gap-4 sm:grid-cols-3">
              <li className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/70">Answer a few quick questions about artists, genres, and mood.</p>
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/70">We match your vibe with curated tracks and live previews.</p>
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/70">Like or dislike to refine future suggestions instantly.</p>
              </li>
            </ol>
          </section>
        )}

        {stage === 'quiz' && (
          <div className="py-16">
            <Quiz onComplete={handleQuizComplete} />
          </div>
        )}

        {stage === 'results' && (
          <div className="py-16">
            <Recommendations
              items={items}
              onNext={() => {}}
              onFeedback={handleFeedback}
            />
            <div className="mt-6 text-center text-xs text-white/40">
              This demo runs locally. In the full app, results are powered by an AI engine and Spotify.
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}

export default App;
