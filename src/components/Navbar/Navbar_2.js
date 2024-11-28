
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import SearchBar from "../ui/SearchBar"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openNav, setOpenNav] = useState(false)
  const [query, setQuery] = useState("")
  const [isSearchActive, setSearchActive] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleNav = () => {
    setOpenNav(!openNav)
    setSearchActive(false)
  }

  const toggleSearch = () => {
    setSearchActive(!isSearchActive)
    setOpenNav(false)
  }

  return (
    <nav className={`fixed top-0 z-[999] w-full transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-center px-4 py-2 lg:px-8">
          {/* Logo */}
          <Link 
            to="/home" 
            className="text-red-600 text-2xl font-bold mr-8 flex-shrink-0"
          >
            V-Anime
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/home" className="text-white hover:text-gray-300 text-sm">
              Home
            </Link>
            <Link to="/top_anime" className="text-white hover:text-gray-300 text-sm">
              Top Anime
            </Link>
            {/* <Link to="/watchHome" className="text-white hover:text-gray-300 text-sm">
              WatchTogether
            </Link> */}
            <Link to="https://github.com/Rahul-Sahani04/V-Anime-App" className="text-white hover:text-gray-300 text-sm"
              target="_blank" rel="noreferrer"
            >
              GitHub
            </Link>
            {/* <Link to="/random" className="text-white hover:text-gray-300 text-sm">
              Random Anime
            </Link> */}
          </div>

          {/* Search and Account Section */}
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <SearchBar 
                search={query} 
                setSearch={setQuery}
                className={`
                  transition-all duration-300 
                  ${isSearchActive 
                    ? 'w-64 opacity-100' 
                    : 'w-0 opacity-0 lg:w-64 lg:opacity-100'
                  }
                `}
              />
              <button 
                onClick={toggleSearch}
                className="lg:hidden text-white p-2"
              >
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </button>
            </div>

            {/* Auth Buttons */}
            {/* <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-1 text-white hover:bg-white/10 rounded-md transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Up
              </Link>
            </div> */}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleNav}
              className="lg:hidden text-white p-2"
            >
              {openNav ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden bg-black transition-all duration-300 overflow-hidden
            ${openNav ? 'max-h-96' : 'max-h-0'}
          `}
        >
          <div className="px-4 py-2 space-y-2">
            <Link 
              to="/home"
              className="block text-white hover:text-gray-300 py-2"
            >
              Home
            </Link>
            <Link 
              to="/top_anime"
              className="block text-white hover:text-gray-300 py-2"
            >
              Top Anime
            </Link>
            <Link 
              to="/watchHome"
              className="block text-white hover:text-gray-300 py-2"
            >
              WatchTogether
            </Link>
            <Link 
              to="/random_img"
              className="block text-white hover:text-gray-300 py-2"
            >
              Random Image
            </Link>
            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigate('/login')}
                className="w-full px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

