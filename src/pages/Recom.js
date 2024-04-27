import React, { useState, useEffect, useRef } from 'react';
import '../main.css';
import Card_Component from '../components/card';
import Wavy from '../components/Loader/wavy_loader';

function Recom(props) {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  
  const [recomList, setRecomList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [tempDetails, setTempDetails] = useState([])

  const fetchRecom = async (page_no, perPage) => {
    setIsLoading(true);
    const response = await fetch(`${API_ENDPOINT}/meta/anilist/recent-episodes?page=${page_no}&perPage=${perPage}`);
    const data = await response.json();
    setRecomList((prev) => [...prev, ...data.results]);
    setIsLoading(false);
  };

  // const fetchDetails = async (id) => {
  //   const response = await fetch(`https://api.enime.moe/anime/${id}`);
  //   const data = await response.json();
  //   const tempDetails = data;
  //   setTempDetails(tempDetails);
  // }

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
    fetchRecom(page, 12);
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
                                index={index}
                  className={"anime-card"}
                  title={
                    anime.title.english
                      ? anime.title.english
                      : anime.title.userPreferred
                  }
                  id={anime.id}
                  image={anime.image}
                  type={anime.type}
                  year={anime.releaseDate}
                  status={anime.status}
                  TotalEp={anime.totalEpisodes}
                  genre={anime.genres}
                  color={anime.color}
            />
          </div>
        ))}
        {isLoading && <Wavy />}
      </div>
    </div>
  );
}

export default Recom;
