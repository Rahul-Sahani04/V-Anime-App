import React, { useState, useEffect, useRef } from 'react';
import '../main.css';
import Card_Component from '../components/card';
import Wavy from '../components/wavy_loader';

function Recom(props) {
  const [recomList, setRecomList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [tempDetails, setTempDetails] = useState([])

  const fetchRecom = async (page_no) => {
    setIsLoading(true);
    const response = await fetch(`https://api.enime.moe/recent?page=${page_no}`);
    const data = await response.json();
    setRecomList((prev) => [...prev, ...data.data]);
    console.log(recomList)
    setIsLoading(false);
  };

  const fetchDetails = async (id) => {
    const response = await fetch(`https://api.enime.moe/anime/${id}`);
    const data = await response.json();
    const tempDetails = data;
    setTempDetails(tempDetails);
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollHeight - (scrollPosition + windowHeight) < 50 && !isLoading) {
      setIsLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchRecom(page);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
        fetchRecom(page);
    }
}, [page]);


  return (
    <div>
      <div className='ml-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative gap-5' key={'D-ID'}>
        {recomList.map((anime, index) => (
          <div key={'ID' + index}>

            <Card_Component
              className={'anime-card mt-10'}
              id={anime.anime.slug ? anime.anime.slug : anime.anime.id}
              SubOrDub={anime.title ? anime.title : null}
              title={anime.anime.slug.split("-").join(" ").toUpperCase()}
              image={anime.anime.coverImage ? anime.anime.coverImage : anime.anime.bannerImage ? anime.anime.bannerImage : anime.image ? anime.image : "../img/blank.png"}
            />
          </div>
        ))}
        {isLoading && <Wavy />}
      </div>
    </div>
  );
}

export default Recom;
