import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './main.css';
import './components/card.css';
import "./components/Navbar.css";
import TrendingAnimeComponent from './components/TrendingAnimeApi';
import { inject } from '@vercel/analytics';


function App() {
  inject();
  const [Query, setQuery] = useState('');
  return (
    <div className='h-full w-full'>
      <div className="content-image">
        <div className="header-links">
          <Link className="header-items hover:scale-110 transition-all duration-300 ease-in-out" to="/home">Home</Link>
          <Link className="header-items hover:scale-110 transition-all duration-300 ease-in-out" to="/movie">Movie</Link>
          <Link className="header-items hover:scale-110 transition-all duration-300 ease-in-out" to="/popular">Popular</Link>
          <Link className="header-items hover:scale-110 transition-all duration-300 ease-in-out" to="/top_anime">Top Anime</Link>
        </div>
        <div className='w-2/6 object-contain flex items-center bg-slate-800 rounded-full overflow-hidden px-2 py-1 justify-end transition-all duration-300 ease-in-out shadow-lg'>
          <input className='transition-all duration-500 ease-in-out indent-4 w-full text-gray-200 text-lg flex-grow outline-none focus:caret-lime-500 border-4 border-slate-800 bg-slate-800 focus:border-lime-500 object-contain h-[55px] rounded-full mr-2 ' type='text' onChange={(e) => setQuery(e.target.value)} />
          <Link key={Query} to={{ pathname: '/search', search: `?query=${Query}` }}>
            <button type="button" className="transition-all duration-500 ease-in-out text-white border bg-gray-900 hover:scale-125 hover:drop-shadow-xl focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg hover:rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Search</button>
          </Link>
        </div>

        {/* <div className="xhashtag">
            <span class="title">Top search:</span>
            <a href="/search?keyword=One%20Piece" className="item">One Piece</a>
          </div> */}
        {/* <TrendingAnimeComponent /> */}
      </div>
    </div>
  );
}

export default App;
