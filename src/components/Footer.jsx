import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-8 text-center text-sm text-white/60">
      <p>
        Built with love for discovery. Feedback improves your match over time.
      </p>
      <p className="mt-2">
        © {new Date().getFullYear()} MusicMatch AI
      </p>
    </footer>
  );
}
