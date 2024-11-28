import { Link } from "react-router-dom";
import { cn } from "./lib/utils";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent px-4 py-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="shrink-0">
          <span className="text-2xl font-bold text-red-600">NETFLIX</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-white hover:text-gray-300">
            Home
          </Link>
          <Link
            href="/tv-shows"
            className="text-sm text-white hover:text-gray-300"
          >
            TV Shows
          </Link>
          <Link
            href="/movies"
            className="text-sm text-white hover:text-gray-300"
          >
            Movies
          </Link>
          <Link href="/new" className="text-sm text-white hover:text-gray-300">
            New & Popular
          </Link>
          <Link
            href="/my-list"
            className="text-sm text-white hover:text-gray-300"
          >
            My List
          </Link>
          <Link
            href="/languages"
            className="text-sm text-white hover:text-gray-300"
          >
            Browse by Languages
          </Link>
        </div>
      </div>
    </nav>
  );
}
