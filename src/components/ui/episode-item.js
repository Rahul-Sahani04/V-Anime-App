import { Link } from "react-router-dom";

export function EpisodeItem({ id, ep_id, number, title, description, thumbnail }) {
  return (
    <Link to={`/watch?query=${id}&epId=${ep_id}`}>
      <div
        className="flex gap-4 p-4 bg-[#161616c9] hover:bg-[#161616]
       rounded-lg group transition-colors"
      >
        <div className="relative w-24 h-14 flex-shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
          <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M8 5.14V19.14L19 12.14L8 5.14Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-white text-sm">
            {number}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-lg font-medium">{title}</h3>
              <p className="text-gray-400 text-sm mt-1 italic">{description}</p>
            </div>
            <button className="flex-shrink-0 text-gray-400 hover:text-white transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 15V3M10 15L5 10M10 15L15 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
