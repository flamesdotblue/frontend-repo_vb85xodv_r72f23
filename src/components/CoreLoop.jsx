import { useEffect, useMemo, useRef, useState } from 'react';

const GENRE_OPTIONS = ['Rock', 'Pop', 'Classical', 'Hip-Hop', 'Electronic', 'Jazz', 'Other'];
const MOOD_OPTIONS = ['Energetic/Uplifting', 'Calm/Chill', 'Dark/Emotional', 'Danceable', 'Nostalgic', 'Other'];

export default function CoreLoop({
  recommendation,
  onFeedbackAndFollowup, // (feedback: 'like'|'dislike', followup: { type: 'genre'|'mood', value: string }) => void
  onFinish,
  likesCount,
  dislikesCount,
  iterations,
}) {
  const audioRef = useRef(null);
  const [phase, setPhase] = useState('recommend'); // 'recommend' | 'followup'
  const [followupType, setFollowupType] = useState(null); // 'genre' | 'mood'
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setPhase('recommend');
    setFollowupType(null);
    setSelected('');
  }, [recommendation?.id]);

  const handleFeedback = (type) => {
    if (!recommendation) return;
    const nextType = type === 'like' ? 'genre' : 'mood';
    setFollowupType(nextType);
    setPhase('followup');
  };

  const handleSubmitFollowup = () => {
    if (!selected || !followupType) return;
    onFeedbackAndFollowup(followupType === 'genre' ? 'like' : 'dislike', { type: followupType, value: selected });
    setSelected('');
  };

  const options = useMemo(() => (followupType === 'genre' ? GENRE_OPTIONS : MOOD_OPTIONS), [followupType]);

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-sm text-neutral-600">Likes: {likesCount} • Dislikes: {dislikesCount} • Round {iterations}</div>
        <button onClick={onFinish} className="text-sm font-medium text-red-600 hover:text-red-700">Finish</button>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 md:p-8">
          {/* Step A: Recommendation */}
          <div>
            <p className="text-neutral-700">Based on your answer to the last question, we recommend this song:</p>
            {recommendation ? (
              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-900">{recommendation.title}</h3>
                  <p className="text-neutral-700">{recommendation.artist}</p>
                </div>
                <audio ref={audioRef} controls className="w-full md:w-72">
                  <source src={recommendation.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="mt-6 text-neutral-600">Finding a great match...</div>
            )}
          </div>

          {/* Step B: Feedback */}
          {phase === 'recommend' && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleFeedback('like')}
                className="flex-1 rounded-xl bg-green-500 px-5 py-3 text-white font-semibold shadow hover:bg-green-600 transition"
              >
                👍 LOVE IT!
              </button>
              <button
                onClick={() => handleFeedback('dislike')}
                className="flex-1 rounded-xl bg-neutral-800 px-5 py-3 text-white font-semibold shadow hover:bg-black transition"
              >
                👎 NOT FOR ME.
              </button>
            </div>
          )}

          {/* Step C: Next Question */}
          {phase === 'followup' && (
            <div className="mt-8">
              {followupType === 'genre' ? (
                <p className="text-neutral-800">Great! What is your favorite genre of music to listen to when you are relaxing?</p>
              ) : (
                <p className="text-neutral-800">Got it. What kind of mood are you hoping to listen to next?</p>
              )}

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelected(opt)}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                      selected === opt
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSubmitFollowup}
                  disabled={!selected}
                  className="rounded-xl bg-red-500 disabled:bg-red-300 px-5 py-3 text-white font-semibold shadow hover:bg-red-600 transition"
                >
                  Save and Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
