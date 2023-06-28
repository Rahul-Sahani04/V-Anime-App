import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TrendingAnimeComponent() {
  const [trendingAnimeData, setTrendingAnimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://zoro.to/home');
      const htmlContent = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      const trendingAnimes = doc.querySelectorAll('.swiper-slide.item-qtip');
      const trendingAnimeList = [];

      trendingAnimes.forEach((anime) => {
        trendingAnimeList.push({
          name: anime.querySelector('a > img').getAttribute('title'),
          link: 'https://zoro.to' + anime.querySelector('a').getAttribute('href'),
        });
      });

      setTrendingAnimeData(trendingAnimeList);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Trending Anime</h1>
      <ul>
        {trendingAnimeData.map((anime, index) => (
          <li key={index}>
            <a href={anime.link}>{anime.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingAnimeComponent;
