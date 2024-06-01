import React, { useState, useEffect } from "react";
// import ReactHover, { Trigger, Hover } from 'react-hover';
import "../main.css";
import "../components/card.css";
import Card_Component from "../components/card";
import MyNavbar from "../components/Navbar/Navbar_2";
// import ThemeToggleButton from '../components/toggleTheme';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Wavy from "../components/Loader/wavy_loader";
// import AnimeDetails from './Details';
import Sidebar from "../components/Sidebar";
import CustomFooter from "../components/footer";

const Search = ({ query_y }) => {
  
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [Query, setQuery] = useState("");
  const [MangaQuery, setMangaQuery] = useState("");
  const [isVisibleIndex, setIsVisibleIndex] = useState(0);

  let temp = "";
  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [mangaList, setMangaList] = useState([]);
  const [totalEpisodes, setTotalEpisodes] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchAnime = async (query, page) => {
    setDataLoaded(false);
    let formattedQuery = query.replace(/\s+/g, "%20").toLowerCase();

    const response = await fetch(
      `${API_ENDPOINT}/meta/anilist/${formattedQuery}?page=${page}`
    );
    const data = await response.json();
    const animeList = data.results;
    console.log(animeList);

    setAnimeList(animeList);
    setQuery(temp);
    const Query = query;
    setQuery(Query);
    setDataLoaded(true);
  };

  const fetchManga = async (query, page) => {
    setDataLoaded(false);
    let formattedQuery = query.replace(/\s+/g, "%20").toLowerCase();

    const response = await fetch(
      `${API_ENDPOINT}/manga/managreader/${formattedQuery}?perPage=5`
    );
    const data = await response.json();
    const mangaList = data.results;
    console.log(mangaList);

    setMangaList(mangaList);
    setMangaQuery(temp);
    const Query = query;
    setMangaQuery(Query);
    setDataLoaded(true);
  };


  const fetchTotalEpisodes = async (query) => {
    setDataLoaded(false);
    const response = await fetch(`${API_ENDPOINT}/meta/anilist/info/${query}`);
    const data = await response.json();
    const totalEpisodes = data.totalEpisodes;
    setTotalEpisodes(totalEpisodes);
    return totalEpisodes;
  };

  useEffect(() => {
    const Query = new URLSearchParams(location.search).get("query");
    if (Query) {
      setQuery(Query);
      fetchAnime(Query, page);
      // fetchManga(Query, page);
    } else {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    // document.title = "Search" + Query && Query;
 }, []);

  return (
    <div className={` app ${isDarkMode ? "light-theme" : "dark-theme"} z-10`}>
      <MyNavbar />
      <div className="flex flex-grow lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-between">
        {dataLoaded ? (
          <div
            className="w-full py-6 px-6 col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-14 myCustomCardContainer"
            key={"D-ID"}
          >
            {animeList?.map((anime, index) => (
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
            ))}

            {mangaList?.map((anime, index) => (
              <div
                key={animeList.length + index}
              >

                <Card_Component
                  index={index}
                  className={"anime-card"}
                  title={anime.title}
                  id={anime.id}
                  image={anime.image}
                  type={anime.type}
                  genre={anime.genres}
                  manga
                />
              </div>
            ))}
          </div>
        ) : (
          <Wavy />
        )}
        <div className=" justify-end right-0 hidden lg:block xl:block laptop:w-1/2">
          <Sidebar />
        </div>
      </div>
      <CustomFooter />
    </div>
  );
};

export default Search;
