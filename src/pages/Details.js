import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import MY_Navbar2 from "../components/Navbar_2";

import Card_Component from "../components/card";
import Custom_Footer from "../components/footer";
import Skeleton from "react-loading-skeleton";

import "./Details.css";

const AnimeDetails = ({ Anime_ID }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const location = useLocation();

  const [EpLoaded, setEpLoaded] = useState(false);
  const [MainEpLoaded, setMainEpLoaded] = useState(false);
  const [Query, setQuery] = useState("");
  const [active, setActive] = useState("");
  const [animeList, setAnimeList] = useState({});

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
    if (Query) {
      setQuery(Query);
      fetchInfo(Query);
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

  return (
    <div>
      <MY_Navbar2 />
      <div className="w-full overflow-hidden">
        <div className="w-screen h-screen relative">
          {!MainEpLoaded ? (
            <Skeleton
              baseColor="#2b2b2b"
              highlightColor="#000"
              className="absolute bg-center bg-cover w-screen h-1/2 z-0"
            />
          ) : (
            <div
              id="CoverImage"
              style={{
                backgroundImage: "url(" + animeList.cover + ")",
              }}
              className="bg-center bg-cover w-screen h-1/2 z-0"
            >
                <PlayButton />
            </div>
          )}

          <div className="relative w-full h-full">
            {!MainEpLoaded ? (
              <Skeleton
                style={{ position: "absolute" }}
                baseColor="#2b2b2b"
                highlightColor="#000"
                width={"20vw"}
                height={"60vh"}
                className="bg-center bg-cover -top-[40%] left-[5%] z-20"
              />
            ) : (
              <div
                id="Thumbnail"
                style={{
                  backgroundImage: "url(" + animeList.image + ")",
                }}
                className="w-[20vw] h-[60vh] bg-center bg-cover absolute -top-[40%] left-[5%] z-20 rounded-[10px]"
              ></div>
            )}
            <div
              id="CutLine"
              style={{
                background:
                  "linear-gradient(0deg, rgb(0, 0, 0) 30%, rgb(0 0 0) 60%, rgba(0, 0, 0, 0.686) 100%)",
              }}
              className="z-10 w-[110%]  h-[15vh]   border-t-8 border-solid border-yellow-500 absolute  rotate-[4deg] -top-[56px] -left-2"
            ></div>
            <div
              id="Title"
              className="absolute text-4xl text-white left-[30%] z-30 font-serif"
            >
              {MainEpLoaded ? (
                animeList.title.english ? (
                  animeList.title.english
                ) : (
                  animeList.title.native
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
              className="absolute text-xl text-white left-[30%] top-[7%] z-30 font-sans"
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
            <div id="Rating"></div>
            <div
              id="Description"
              className="text-white w-2/4 relative top-[20%] left-[30%]"
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
                  width={"500px"}
                  height={"25px"}
                  count={5}
                  baseColor="#2b2b2b"
                  highlightColor="#000"
                />
              )}
              {/* They say whatever doesn’t kill you makes you stronger, but that’s not the case for the world’s weakest hunter Sung Jinwoo. After being brutally slaughtered by monsters in a high-ranking dungeon, Jinwoo came back with the System, a program only he could see, that’s leveling him up in every way. Now, he’s inspired to discover the secrets behind his powers and the dungeon that spawned them.<br/> <br/> (Source: Crunchyroll) <br/><br/> */}
            </div>
          </div>
        </div>
        <div>
          <div className="m-4 w-full h-full">
            <div>
              <h2 className="text-blue-500 font-extrabold text-2xl p-4 ">
                Recommended for you{" "}
              </h2>
            </div>
            {MainEpLoaded ? (
              <div
                className="col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6 w-[80%] ml-4 "
                key={"D-ID"}
              >
                {animeList.recommendations.slice(0, 12)?.map((anime, index) => (
                  <div key={index} className="flex justify-center">
                    <Card_Component
                      className="anime-card"
                      title={
                        anime.title.english
                          ? anime.title.english
                          : anime.title.userPreferred
                      }
                      id={anime.id}
                      image={anime.image}
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
      </div>
      <Custom_Footer />
    </div>
  );
};

export default AnimeDetails;

// {MainEpLoaded && (
//   <section className="text-gray-400  body-font">
//     <div className="px-5 py-24 mx-auto flex flex-wrap justify-center">
//       <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 w-full content-start sm:pr-10">
//         <div className="w-full sm:p-4 px-4 ml-4 mb-6">
//           <h1 className="title-font font-medium text-2xl mb-2 text-white">
//             {animeList.title.english
//               ? animeList.title.english
//               : animeList.title.romaji}
//           </h1>
//           <div className="leading-relaxed">
//             <p
//               className={`w-10/12 left-0 text-left ${
//                 animeList.description &&
//                 animeList.description.length > 320
//                   ? "h-fit"
//                   : ""
//               }  overflow-y-auto md:text-clip ${
//                 active ? "active" : ""
//               }`}
//               dangerouslySetInnerHTML={{
//                 __html: animeList.description,
//               }}
//             ></p>
//           </div>
//         </div>
//         <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
//           <h2 className="title-font font-medium text-xl text-white">
//             {animeList.totalEpisodes}
//           </h2>
//           <p className="leading-relaxed text-left">
//             Total <br /> Episodes
//           </p>
//         </div>
//         <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
//           <h2 className="title-font font-medium text-xl text-white ">
//             {animeList.currentEpisode}
//           </h2>
//           <p className="leading-relaxed text-left">Current Episodes</p>
//         </div>
//         <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
//           <h2 className="title-font font-medium text-xl text-white">
//             {animeList.status}
//           </h2>
//           <p className="leading-relaxed text-left">Status</p>
//         </div>
//         <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
//           <h2 className="title-font font-medium text-xl text-white">
//             {animeList.subOrDub === "sub" ? "Subbed" : "Dubbed"}
//           </h2>
//           <p className="leading-relaxed text-left">Sub or Dub</p>
//         </div>
//         <div className="m-8">
//           <Link
//             to={{
//               pathname: "/watch",
//               search: `?query=${animeList.id}`,
//             }}
//           >
//             <button className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
//               Watch
//             </button>
//           </Link>
//         </div>
//       </div>
//       <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0 flex justify-center ">
//         <img
//           className="object-cover object-center w-3/4 h-[85vh] border-double rounded-lg border-4 border-blue-500"
//           src={animeList.image}
//           alt="stats"
//         />
//       </div>
//     </div>
//   </section>
// )}
