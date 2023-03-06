import React, { useState, useEffect } from 'react';
import '../main.css';
import Card_Component from '../components/card';
import Wavy from '../components/wavy_loader';

function Recom(props) {
  const [recomList, setRecomList] = useState([]);
  const [HasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [dataLoaded, setDataLoaded] = useState(false);

  // console.log(recomList);
  // const fetchRecom = async (page_no) => {
  //   setDataLoaded(false);
  //   const response = await fetch(`https://api.consumet.org/anime/gogoanime/recent-episodes?page=${page_no}`);
  //   const data = await response.json();
  //   setHasNextPage(data.hasNextPage);

  //   setRecomList(data.results);
  //   setTotalPages(totalPages);

  //   setDataLoaded(true);
  // };
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecom = async (page_no) => {
      setIsLoading(true);
      const response = await fetch(`https://api.consumet.org/anime/gogoanime/recent-episodes?page=${page_no}`);
      const data = await response.json();
      setHasNextPage(data.hasNextPage);
      setRecomList((prev) => [...prev, ...data.results]);

      setIsLoading(false);
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY;

    if (scrollHeight - (scrollPosition + windowHeight) < 50 && !dataLoaded && HasNextPage) {
        setIsLoading(true);
        setPage((prev) => prev + 1);
    }
};

  
  useEffect(() => {
    fetchRecom(1);
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
        <div className='container' key={"D-ID"}>
          {recomList.map((recom, index) => (
            <div className='card-here'>
              <Card_Component theme_mode={props.theme} className={'anime-card'} id={recom.id} title={recom.title} image={recom.image} key={"ID" + index} />
            </div>
          ))}
        </div>
        {isLoading && (
          <Wavy />
        )}
      </div>
    );
  }

export default Recom;