import React, { useState, useEffect, useRef } from "react";
import "../main.css";
import Card_Component from "../components/card";
import MyNavbar from "../components/Navbar/Navbar_2";
import Wavy from "../components/Loader/wavy_loader";
import Sidebar from "../components/Sidebar";
import CustomFooter from "../components/footer";
import "../components/card.css";
function Top_Anime(props) {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [isVisibleIndex, setIsVisibleIndex] = useState(0);

  const [recomList, setRecomList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnime = async (page_no) => {
    setIsLoading(true);
    const response = await fetch(
      `${API_ENDPOINT}/meta/anilist/trending?page=${page_no}&perPage=12`
    );
    const data = await response.json();
    console.log(data);
    setRecomList((prev) => [...prev, ...data.results]);
    setIsLoading(false);
  };



  useEffect(() => {
    fetchAnime(page);
  }, []);

  useEffect(() => {
    // document.title = "Top Anime";
 }, []);

  return (
    <div className="app">
      <MyNavbar />

      <div className="flex flex-grow lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-between">
        {isLoading ? (
          <Wavy />
        ) : (
          <div
            className="w-full py-6 px-6 col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-14 myCustomCardContainer"
            key={"D-ID"}
          >
            {recomList.map((anime, index) => (
              <div className="card-here flex justify-center" key={"ID" + index}>
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
          </div>
        )}
        <div className=" justify-end right-0 hidden lg:block xl:block laptop:w-1/2">
          <Sidebar />
        </div>
      </div>
      <CustomFooter />
    </div>
  );
  // }
}

export default Top_Anime;
