export function HeroBanner({ title, description, coverImage, onPlay }) {
  return (
    <div className="relative h-[85vh] w-full">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {title}
          </h1>
          <p className="text-lg text-gray-300 line-clamp-3">{description}</p>
          <div className="flex gap-3">
            <button
              onClick={onPlay}
              className="px-8 py-2 bg-white text-black font-semibold rounded flex items-center gap-2 hover:bg-white/90"
            >
              <PlayIcon />
              Play
            </button>
            {/* <button className="px-8 py-2 bg-gray-500/70 text-white font-semibold rounded flex items-center gap-2 hover:bg-gray-500/60">
              <InfoIcon />
              More Info
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
