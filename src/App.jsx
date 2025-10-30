import { useMemo, useState } from 'react';
import Hero from './components/Hero.jsx';
import CoreLoop from './components/CoreLoop.jsx';
import FinalResults from './components/FinalResults.jsx';
import Footer from './components/Footer.jsx';

// Demo catalog with simple tags for scoring
const CATALOG = [
  {
    id: 't1',
    title: 'Midnight Drive',
    artist: 'Neon Avenues',
    genres: ['Electronic', 'Pop'],
    moods: ['Energetic/Uplifting', 'Danceable'],
    popularity: 'mid',
    previewUrl:
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8c8f6e9f95.mp3?filename=future-bass-111064.mp3',
  },
  {
    id: 't2',
    title: 'Gentle Waves',
    artist: 'Ocean Bloom',
    genres: ['Lo-fi', 'Jazz'],
    moods: ['Calm/Chill', 'Nostalgic'],
    popularity: 'obscure',
    previewUrl:
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_6f9c2e2d91.mp3?filename=lofi-study-111042.mp3',
  },
  {
    id: 't3',
    title: 'Sunset Avenue',
    artist: 'Indigo Street',
    genres: ['Indie', 'Rock'],
    moods: ['Energetic/Uplifting'],
    popularity: 'mid',
    previewUrl:
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_0b0b0e2f72.mp3?filename=summer-walk-111049.mp3',
  },
  {
    id: 't4',
    title: 'City Lights',
    artist: 'Metro Pulse',
    genres: ['R&B', 'Electronic'],
    moods: ['Danceable', 'Dark/Emotional'],
    popularity: 'mainstream',
    previewUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 't5',
    title: 'Golden Hour',
    artist: 'Aurora Lane',
    genres: ['Pop'],
    moods: ['Energetic/Uplifting', 'Nostalgic'],
    popularity: 'mainstream',
    previewUrl:
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_ba88a3b4a3.mp3?filename=golden-hour-111060.mp3',
  },
  {
    id: 't6',
    title: 'Echoes & Dust',
    artist: 'Mono Bloom',
    genres: ['Ambient', 'Classical'],
    moods: ['Calm/Chill'],
    popularity: 'obscure',
    previewUrl:
      'https://cdn.pixabay.com/download/audio/2021/09/30/audio_9b9d7d9d1a.mp3?filename=ambient-10689.mp3',
  },
  {
    id: 't7',
    title: 'Sidewalk Serenade',
    artist: 'Corner Jazz Trio',
    genres: ['Jazz'],
    moods: ['Calm/Chill'],
    popularity: 'mid',
    previewUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 't8',
    title: 'Voltage Bloom',
    artist: 'Circuit Poets',
    genres: ['Electronic'],
    moods: ['Danceable', 'Energetic/Uplifting'],
    popularity: 'obscure',
    previewUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 't9',
    title: 'Analog Heart',
    artist: 'Tape Machine',
    genres: ['Rock'],
    moods: ['Dark/Emotional'],
    popularity: 'mid',
    previewUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 't10',
    title: 'Velvet Moon',
    artist: 'Nocturne Club',
    genres: ['Electronic', 'Hip-Hop'],
    moods: ['Danceable'],
    popularity: 'mainstream',
    previewUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: 't11',
    title: 'Quiet Pines',
    artist: 'Sierra Ensemble',
    genres: ['Classical'],
    moods: ['Calm/Chill', 'Nostalgic'],
    popularity: 'obscure',
    previewUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: 't12',
    title: 'Neon Reverie',
    artist: 'Glass District',
    genres: ['Pop', 'Electronic'],
    moods: ['Energetic/Uplifting'],
    popularity: 'mainstream',
    previewUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
];

function scoreTrack(track, state) {
  const {
    likedArtists,
    dislikedArtists,
    likedGenres,
    likedMoods,
    dislikedGenres,
    dislikedMoods,
    popularityHistory,
  } = state;

  let score = 0;

  if (likedArtists.has(track.artist)) score += 3;
  if (dislikedArtists.has(track.artist)) score -= 3;

  for (const g of track.genres) {
    if (likedGenres.has(g)) score += 2;
    if (dislikedGenres.has(g)) score -= 2;
  }

  for (const m of track.moods) {
    if (likedMoods.has(m)) score += 1.5;
    if (dislikedMoods.has(m)) score -= 1.5;
  }

  // Encourage diversity in popularity tiers
  const recentCount = popularityHistory.slice(-4).filter((p) => p === track.popularity).length;
  score -= recentCount * 0.5;

  // Small jitter for variety
  score += Math.random() * 0.3;

  return score;
}

function App() {
  const [stage, setStage] = useState('welcome'); // 'welcome' | 'loop' | 'final'
  const [initialArtist, setInitialArtist] = useState('');
  const [likes, setLikes] = useState([]); // track ids
  const [dislikes, setDislikes] = useState([]); // track ids
  const [shown, setShown] = useState([]); // track ids recommended so far
  const [likedArtists, setLikedArtists] = useState(new Set());
  const [dislikedArtists, setDislikedArtists] = useState(new Set());
  const [likedGenres, setLikedGenres] = useState(new Set());
  const [likedMoods, setLikedMoods] = useState(new Set());
  const [dislikedGenres, setDislikedGenres] = useState(new Set());
  const [dislikedMoods, setDislikedMoods] = useState(new Set());
  const [popularityHistory, setPopularityHistory] = useState([]);
  const [iterations, setIterations] = useState(1);

  const available = useMemo(() => CATALOG.filter((t) => !likes.includes(t.id) && !dislikes.includes(t.id) && !shown.includes(t.id)), [likes, dislikes, shown]);

  const currentRecommendation = useMemo(() => {
    // Seed preferences with the initial artist if present
    const seededLikedArtists = new Set(likedArtists);
    if (initialArtist) seededLikedArtists.add(initialArtist);

    const state = {
      likedArtists: seededLikedArtists,
      dislikedArtists,
      likedGenres,
      likedMoods,
      dislikedGenres,
      dislikedMoods,
      popularityHistory,
    };

    let best = null;
    let bestScore = -Infinity;
    for (const t of available) {
      const s = scoreTrack(t, state);
      if (s > bestScore) {
        best = t;
        bestScore = s;
      }
    }
    return best || null;
  }, [available, likedArtists, dislikedArtists, likedGenres, likedMoods, dislikedGenres, dislikedMoods, popularityHistory, initialArtist]);

  const handleStart = (artist) => {
    setInitialArtist(artist);
    setStage('loop');
  };

  const handleFeedbackAndFollowup = (feedback, followup) => {
    if (!currentRecommendation) return;

    // Register recommendation as shown and track popularity history
    setShown((prev) => [...prev, currentRecommendation.id]);
    setPopularityHistory((prev) => [...prev, currentRecommendation.popularity]);

    if (feedback === 'like') {
      setLikes((prev) => [...prev, currentRecommendation.id]);
      setLikedArtists((prev) => new Set(prev).add(currentRecommendation.artist));
      if (followup?.type === 'genre' && followup.value) {
        setLikedGenres((prev) => new Set(prev).add(followup.value));
      }
    } else {
      setDislikes((prev) => [...prev, currentRecommendation.id]);
      setDislikedArtists((prev) => new Set(prev).add(currentRecommendation.artist));
      if (followup?.type === 'mood' && followup.value) {
        setDislikedMoods((prev) => new Set(prev).add(followup.value));
      }
    }

    setIterations((n) => n + 1);
  };

  const handleFinish = () => setStage('final');

  const finalRecs = useMemo(() => {
    // Re-score the entire catalog excluding rated items, then take top 5
    const seededLikedArtists = new Set(likedArtists);
    if (initialArtist) seededLikedArtists.add(initialArtist);

    const state = {
      likedArtists: seededLikedArtists,
      dislikedArtists,
      likedGenres,
      likedMoods,
      dislikedGenres,
      dislikedMoods,
      popularityHistory,
    };

    return CATALOG
      .filter((t) => !likes.includes(t.id) && !dislikes.includes(t.id))
      .map((t) => ({ t, s: scoreTrack(t, state) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 5)
      .map(({ t }) => t);
  }, [likes, dislikes, likedArtists, dislikedArtists, likedGenres, likedMoods, dislikedGenres, dislikedMoods, popularityHistory, initialArtist]);

  const handleRestart = () => {
    setStage('welcome');
    setInitialArtist('');
    setLikes([]);
    setDislikes([]);
    setShown([]);
    setLikedArtists(new Set());
    setDislikedArtists(new Set());
    setLikedGenres(new Set());
    setLikedMoods(new Set());
    setDislikedGenres(new Set());
    setDislikedMoods(new Set());
    setPopularityHistory([]);
    setIterations(1);
  };

  const handleShare = async () => {
    const summary = `I found new music with The Music Matchmaker: ${likes.length} likes, ${dislikes.length} dislikes. Give it a try!`;
    try {
      await navigator.clipboard.writeText(summary);
      alert('Summary copied to clipboard!');
    } catch (e) {
      alert(summary);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900">
      {stage === 'welcome' && <Hero onStart={handleStart} />}

      {stage === 'loop' && (
        <CoreLoop
          recommendation={currentRecommendation}
          onFeedbackAndFollowup={handleFeedbackAndFollowup}
          onFinish={handleFinish}
          likesCount={likes.length}
          dislikesCount={dislikes.length}
          iterations={iterations}
        />
      )}

      {stage === 'final' && (
        <FinalResults
          likes={likes.length}
          dislikes={dislikes.length}
          recommendations={finalRecs}
          onRestart={handleRestart}
          onShare={handleShare}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
