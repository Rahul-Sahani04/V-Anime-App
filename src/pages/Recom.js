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
  const fetchRecom = async (page_no) => {
    setDataLoaded(false);
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/recent-episodes?page=${page_no}`);
    const data = await response.json();
    setHasNextPage(data.hasNextPage);
    // console.log("NEXT : " + HasNextPage);
    // console.log(data.results);
    setRecomList(data.results);
    setTotalPages(totalPages);
    // console.log(`TOTAL PAGE: ${totalPages}`);
    setDataLoaded(true);
  };


  useEffect(() => {
    fetchRecom(1);
  }, []);

  if (!dataLoaded) {
    return <Wavy />
  }
  else {

    return (
      <div>
        <div className='container' key={"D-ID"}>
          {recomList.map((recom, index) => (
            <div className='card-here'>
              <Card_Component theme_mode={props.theme} className={'anime-card'} id={recom.id} title={recom.title} image={recom.image} key={"ID" + index} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Recom;