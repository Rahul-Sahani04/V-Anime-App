import React, { useState, useEffect } from 'react';
import '../main.css';
import Card_Component from '../components/card';
const ItemPerPage = 5;
function Recom(props) {
  const [recomList, setRecomList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // console.log(recomList);
  const fetchRecom = async (query) => {
    const response = await fetch(`https://api.jikan.moe/v4/recommendations/anime?page=1`);
    const data = await response.json();
    const totalPages = data.pagination.last_visible_page;
    // console.log(data.data);
    setRecomList(data.data);
    setTotalPages(totalPages);
    console.log(`TOTAL PAGE: ${totalPages}`);
  };
  
  useEffect(() => {
    fetchRecom();
  }, []);

  return (
    <div onScroll={() => {
        if (page < totalPages) {
          setPage(page + 1);
        }
    }}>
      {recomList.slice(0, page * ItemPerPage).map((item, index) => (
        <div className='container' key={"D-ID" + index}>
          {/* <Recom/> */}

          {
            recomList?.map((recom, index) => (
              <Card_Component theme_mode={props.theme} className={'anime-card'} title={recom.entry[0].title} image={recom.entry[0].images.jpg.large_image_url} description={recom.content} href={recom.entry[0].url} key={"ID" + index} />
            )
            )}
        </div>
      ))}
    </div>
  );
}

export default Recom;