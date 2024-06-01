import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import MyNavbar from "../components/Navbar/Navbar_2";

import Card_Component from "../components/card";
import CustomFooter from "../components/footer";
import Skeleton from "react-loading-skeleton";

import "./Details.css";

import "../components/card.css";

const AnimeDetails = ({ Anime_ID }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [isVisibleIndex, setIsVisibleIndex] = useState(0);

  const [isManga, setIsManga] = useState(false);

  const location = useLocation();

  const [EpLoaded, setEpLoaded] = useState(false);
  const [MainEpLoaded, setMainEpLoaded] = useState(false);
  const [Query, setQuery] = useState("");
  const [active, setActive] = useState("");
  const [animeList, setAnimeList] = useState();

  const fetchInfo = async (query) => {
    try {
      setMainEpLoaded(false);
      const response = await fetch(
        `${API_ENDPOINT}/meta/anilist/info/${query}`
      );
      const data = await response.json();
      const animeList = data;
      console.log("data: ", data);

      setAnimeList(animeList);
      setMainEpLoaded(true);
      setEpLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMangaInfo = async (query) => {
    try {
      setMainEpLoaded(false);
      const response = await fetch(
        `${API_ENDPOINT}/manga/managreader/info?id=${query}`
      );
      const data = await response.json();
      const animeList = data;
      console.log("data: ", data);
      console.log("Length ", animeList.chapters.length);
      setAnimeList(animeList);
      setMainEpLoaded(true);
      setEpLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRandom = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/meta/anilist/random-anime`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      const data = await response.json();
      if (data.message === "Anime not found") {
        fetchRandom();
      }
      setAnimeList(data);
      setEpLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const isOnlyNumbers = (str) => {
    const numberPattern = /^\d+$/;
    return numberPattern.test(str);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const Query = Anime_ID || new URLSearchParams(location.search).get("id");
    const Manga = Anime_ID || new URLSearchParams(location.search).get("manga");
    if (Query) {
      setQuery(Query);
      if (Manga) {
        setIsManga(true);
        fetchMangaInfo(Query);
      } else {
        fetchInfo(Query);
      }
    } else {
      navigate("/home");
    }
  }, [Anime_ID, location]);

  function PlayButton() {
    function navigateToWatch() {
      // sleep for  1 second before navigating to watch page
      setTimeout(() => {
        navigate(`/watch?query=${animeList.id}`);
      }, 1000);
    }
    return (
      <div class="MyPlayContainer" onClick={navigateToWatch}>
        <label>
          <input class="play-btn" type="checkbox" />
          <div class="play-icon"></div>
          <div class="pause-icon"></div>
        </label>
      </div>
    );
  }

  // useEffect(() => {
  //   // document.title =
  //     "Details - "  + animeList.title ? animeList.title.english
  //       ? animeList.title.english
  //       : animeList.title.native : "";
  // }, []);

  return (
    <div className="bg-black">
      <MyNavbar />
      <div className="w-full overflow-hidden">
        <div className="w-screen h-[1500px] relative">
          {!MainEpLoaded ? (
            <Skeleton
              baseColor="#2b2b2b"
              highlightColor="#000"
              className="absolute bg-center bg-cover w-screen h-[400px] z-0"
            />
          ) : (
            <div
              id="CoverImage"
              style={{
                backgroundImage: `url(" ${
                  isManga ? animeList.image : animeList.cover
                } ")`,
                backgroundRepeat: "no-repeat",
              }}
              className="bg-center bg-cover w-screen h-[400px] z-0"
            >
              <PlayButton />
              <div
                id="CutLine"
                style={{
                  background:
                    "linear-gradient(0deg, rgb(0, 0, 0) 30%, rgb(0 0 0) 60%, rgba(0, 0, 0, 0.686) 100%)",
                }}
                className="z-10 w-[110%]  h-[15vh]   border-t-8 border-solid border-yellow-500 absolute  rotate-[4deg] top-[24%] -left-2"
              ></div>
            </div>
          )}

          {!MainEpLoaded ? (
            <Skeleton
              style={{ position: "absolute" }}
              baseColor="#2b2b2b"
              highlightColor="#000"
              width={"250px"}
              height={"350px"}
              className="bg-center bg-cover top-[5%] left-[5%] z-20"
            />
          ) : (
            <div
              id="Thumbnail"
              style={{
                backgroundImage: "url(" + animeList.image + ")",
              }}
              className="w-[250px] h-[350px] bg-center bg-cover absolute top-[5%] left-[5%] z-20 rounded-[10px]"
            ></div>
          )}
          <div className="flex justify-end z-50 items-stretch">
            <div className="relative w-11/12 h-full mt-10 ">
              <div
                id="Title"
                className="relative text-6xl underline underline-offset-8 text-white left-[30%] z-30 font-serif mt-4 w-[65%]"
                style={{ textShadow: "2px 2px 4px #000", lineHeight: "1.2" }}
              >
                {MainEpLoaded ? (
                  !isManga ? (
                    animeList.title.english ? (
                      animeList.title.english
                    ) : (
                      animeList.title.native
                    )
                  ) : (
                    animeList.title
                  )
                ) : (
                  <Skeleton
                    width={"300px"}
                    height={"35px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                )}
              </div>
              <div
                id="Genre"
                className="relative text-xl text-white left-[30%] z-30 font-sans mt-10"
              >
                {MainEpLoaded ? (
                  animeList.genres.join(" | ")
                ) : (
                  <Skeleton
                    width={"300px"}
                    height={"30px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                )}
              </div>
              {MainEpLoaded ? (
                !isManga ? (
                  <div
                    id="Episodes"
                    className="relative text-xl w-2/4 text-white left-[30%]  font-sans mt-4"
                  >
                    Episodes: {animeList && animeList.totalEpisodes}
                  </div>
                ) : (
                  <div
                    id="Chapters"
                    className="relative text-xl w-2/4 text-white left-[30%] font-sans mt-4"
                  >
                    Chapters: {animeList && animeList.chapters.length}
                  </div>
                )
              ) : (
                <Skeleton
                  className="relative text-xl  text-white left-[30%] font-sans mt-4"
                  width={"300px"}
                  height={"30px"}
                  baseColor="#2b2b2b"
                  highlightColor="#000"
                />
              )}
              <div
                id="Description"
                className="text-white w-2/4 relative left-[30%] mt-4"
              >
                {MainEpLoaded ? (
                  <p
                    className="text-left "
                    dangerouslySetInnerHTML={{
                      __html: animeList.description,
                    }}
                  ></p>
                ) : (
                  <Skeleton
                    width={"100%"}
                    height={"25px"}
                    count={10}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                )}
                {/* They say whatever doesn’t kill you makes you stronger, but that’s not the case for the world’s weakest hunter Sung Jinwoo. After being brutally slaughtered by monsters in a high-ranking dungeon, Jinwoo came back with the System, a program only he could see, that’s leveling him up in every way. Now, he’s inspired to discover the secrets behind his powers and the dungeon that spawned them.<br/> <br/> (Source: Crunchyroll) <br/><br/> */}
              </div>
            </div>
          </div>
        </div>
        {!isManga && (
          <div>
            <div className="m-4 w-full h-full">
              <div>
                <h2 className="text-4xl font-bold text-white m-14 w-1/4">
                  Try Similar
                </h2>
              </div>
              {MainEpLoaded ? (
                <div
                  className="myCustomCardContainer col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6 w-[80%] ml-4 "
                  key={"D-ID"}
                >
                  {animeList.recommendations
                    .slice(0, 12)
                    ?.map((anime, index) => (
                      <div key={index} className="flex justify-center">
                        <Card_Component
                          index={index}
                          className="anime-card"
                          title={
                            anime.title.english
                              ? anime.title.english
                              : anime.title.userPreferred
                          }
                          id={anime.id}
                          image={anime.image}
                          type={anime.type}
                          genre={anime.genres}
                          color={anime.color}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div
                  className={`col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6 w-[80%] ml-4  h-[950px] `}
                >
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                  <Skeleton
                    width={"165px"}
                    height={"250px"}
                    baseColor="#2b2b2b"
                    highlightColor="#000"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <CustomFooter />
    </div>
  );
};

export default AnimeDetails;
