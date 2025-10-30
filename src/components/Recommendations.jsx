import React, { useMemo, useRef, useState } from 'react';
import { Play, Pause, ThumbsUp, ThumbsDown, SkipForward, Music } from 'lucide-react';

function TrackCard({ track, isActive, isPlaying, onPlayPause, onLike, onDislike }) {
  return (
    <div className={`group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 ${
      isActive ? 'ring-2 ring-purple-400/40' : ''
    }`}>
      <div className="flex items-center gap-4">
        <img
          src={track.cover}
          alt={track.title}
          className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-white">{track.title}</h4>
          <p className="truncate text-sm text-white/70">{track.artist}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPlayPause}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow transition hover:bg-white/90"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            onClick={onLike}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-300/40 transition hover:brightness-110"
            aria-label="Like"
          >
            <ThumbsUp className="h-5 w-5" />
          </button>
          <button
            onClick={onDislike}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-400/20 text-rose-200 ring-1 ring-rose-300/40 transition hover:brightness-110"
            aria-label="Dislike"
          >
            <ThumbsDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Recommendations({ items, onNext, onFeedback }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const current = items[activeIndex];

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const nextIndex = (activeIndex + 1) % items.length;
    setActiveIndex(nextIndex);
    onNext && onNext(current);
  };

  const like = () => onFeedback && onFeedback({ track: current, action: 'like' });
  const dislike = () => onFeedback && onFeedback({ track: current, action: 'dislike' });

  const grid = useMemo(() => items.slice(0, 6), [items]);

  return (
    <section className="text-white">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 ring-1 ring-purple-400/40">
            <Music className="h-5 w-5 text-purple-200" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Your recommendations</h3>
            <p className="text-sm text-white/70">Fine-tune by liking or disliking tracks</p>
          </div>
        </div>
        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          Next suggestion
          <SkipForward className="h-4 w-4" />
        </button>
      </div>

      {/* Active card */}
      {current && (
        <div className="mb-6">
          <TrackCard
            track={current}
            isActive
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onLike={like}
            onDislike={dislike}
          />
          <audio ref={audioRef} src={current.previewUrl} onEnded={() => setIsPlaying(false)} />
        </div>
      )}

      {/* Grid preview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((t, i) => (
          <div key={t.id} className={i === activeIndex ? 'opacity-100' : 'opacity-90'}>
            <TrackCard
              track={t}
              isActive={i === activeIndex}
              isPlaying={isPlaying && i === activeIndex}
              onPlayPause={() => {
                if (i !== activeIndex) setActiveIndex(i);
                setTimeout(handlePlayPause, 0);
              }}
              onLike={() => {
                if (i !== activeIndex) setActiveIndex(i);
                like();
              }}
              onDislike={() => {
                if (i !== activeIndex) setActiveIndex(i);
                dislike();
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
