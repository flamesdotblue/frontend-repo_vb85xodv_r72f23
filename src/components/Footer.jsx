export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-neutral-600 flex items-center justify-between">
        <span>© {new Date().getFullYear()} The Music Matchmaker</span>
        <span>Made with love for music discovery</span>
      </div>
    </footer>
  );
}
