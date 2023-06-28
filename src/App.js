import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './main.css';
import './components/card.css';
// import MY_Navbar from './components/Navbar_2';
import "./components/Navbar.css";
import TrendingAnimeComponent from './components/TrendingAnimeApi';

function App() {
  const [Query_A, setQueryA] = useState('');
  return (
    <div className='app'>

      <div className="content-image">
        <div className="header-links">
          <Link className="header-items" to="/home">Home</Link>
          <Link className="header-items" to="/movie">Movie</Link>
          <Link className="header-items" to="/popular">Popular</Link>
          <Link className="header-items" to="/top_anime">Top Anime</Link>
        </div>
        <div className='search1-box content-wrap'>

          <input className='search-box' value={Query_A} type={"text"} onChange={e => setQueryA(e.target.value)} />
          <Link className="header-items" to={{
            pathname: "/search",
            search: `?query=${Query_A}`,
            state: { fromHome: true }
          }}>
            <input className='button-27' value={"Search"} type={"Button"} />
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
