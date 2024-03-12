import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import MY_Navbar2 from "../components/Navbar_2";
import Wavy from "../components/wavy_loader";

import Card_Component from "../components/card";
import Custom_Footer from "../components/footer";

const AnimeDetails = ({ Anime_ID }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const location = useLocation();

  const [EpLoaded, setEpLoaded] = useState(false);
  const [Query, setQuery] = useState("");
  const [animeList, setAnimeList] = useState({});
  const [active, setActive] = useState("");

  const fetchInfo = async (query) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/meta/anilist/info/${query}`
      );
      const data = await response.json();
      const animeList = data;
      setAnimeList(animeList);
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

  return (
    <div>
      <MY_Navbar2 />
      <div className="w-full">
        {!EpLoaded && <Wavy />}
        {EpLoaded && (
          <section class="text-gray-400  body-font">
            <div class="px-5 py-24 mx-auto flex flex-wrap justify-center">
              <div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 w-full content-start sm:pr-10">
                <div class="w-full sm:p-4 px-4 ml-4 mb-6">
                  <h1 class="title-font font-medium text-2xl mb-2 text-white">
                    {animeList.title.english
                      ? animeList.title.english
                      : animeList.title.romaji}
                  </h1>
                  <div class="leading-relaxed">
                    <p
                      className={`w-10/12 left-0 text-left ${
                        animeList.description &&
                        animeList.description.length > 320
                          ? "h-fit"
                          : ""
                      }  overflow-y-auto md:text-clip ${
                        active ? "active" : ""
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: animeList.description,
                      }}
                    ></p>
                  </div>
                </div>
                <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                  <h2 class="title-font font-medium text-xl text-white">
                    {animeList.totalEpisodes}
                  </h2>
                  <p class="leading-relaxed text-left">
                    Total <br /> Episodes
                  </p>
                </div>
                <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                  <h2 class="title-font font-medium text-xl text-white ">
                    {animeList.currentEpisode}
                  </h2>
                  <p class="leading-relaxed text-left">Current Episodes</p>
                </div>
                <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                  <h2 class="title-font font-medium text-xl text-white">
                    {animeList.status}
                  </h2>
                  <p class="leading-relaxed text-left">Status</p>
                </div>
                <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                  <h2 class="title-font font-medium text-xl text-white">
                    {animeList.subOrDub === "sub" ? "Subbed" : "Dubbed"}
                  </h2>
                  <p class="leading-relaxed text-left">Sub or Dub</p>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: "/watch",
                      search: `?query=${animeList.id}`,
                    }}
                  >
                    <button className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
                      Watch
                    </button>
                  </Link>
                </div>
              </div>
              <div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0 flex justify-center ">
                <img
                  class="object-cover object-center w-3/4 h-[85vh] border-double rounded-lg border-4 border-blue-500"
                  src={animeList.image}
                  alt="stats"
                />
              </div>
            </div>
          </section>
        )}
        <div>
          {animeList.recommendations && (
            <div className="m-4">
              <div>
                <h2 className="text-blue-500 font-extrabold text-2xl p-4 ">Recommended for you </h2>
              </div>
              {EpLoaded ? (
                <div
                  className="col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6 w-[80%] ml-4 "
                  key={"D-ID"}
                >
                  {animeList.recommendations.slice(0, 12)?.map((anime, index) => (
                    <div key={index}>
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
                <Wavy />
              )}
            </div>
          )}
        </div>
      </div>
      <Custom_Footer />
    </div>
  );
};

export default AnimeDetails;

// function name(params) {
//   return (
//     <div>
//       <div className="w-full sm:flex md:flex lg:flex filter-none m-4">
//         <div
//           style={{
//             backgroundImage: `url(${animeList.image})`,
//             backgroundRepeat: "no-repeat",
//           }}
//           className="w-[60dvw] h-[100dvh] object-fill col-span-2"
//         />
//         <div className="m-0 lg:m-10 xl:ml-10 mt-5 infos text-left col-span-1 w-full">
//           {animeList.title && (
//             <div>
//               <h3 className="text-teal-100 text-lg">
//                 {animeList.title.romaji ?? ""}
//               </h3>
//               <h1 className="text-teal-100 text-4xl">
//                 {animeList.title.english ?? ""}
//               </h1>
//             </div>
//           )}

//           <p className="text-left m-3">{animeList.format}</p>
//           <div className="w-full grid gap-4 grid-cols-1 m-3 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 ">
//             {/* <div className="rounded-lg overflow-hidden">
//                                 <img className="w-5/12" src={image} alt={title} />
//                             </div> */}
//             <p
//               className={`w-10/12 left-0 text-left ${
//                 animeList.description && animeList.description.length > 320
//                   ? "h-fit"
//                   : ""
//               }  overflow-y-auto md:text-clip ${active ? "active" : ""}`}
//               dangerouslySetInnerHTML={{ __html: animeList.description }}
//             ></p>
//             {animeList.trailer && (
//               <p className="text-left">
//                 <b>Trailer: </b>
//                 <a
//                   href={`https://www.youtube.com/watch?v=${animeList.trailer.id}`}
//                 >
//                   Watch Here
//                 </a>
//               </p>
//             )}
//             <p className="text-left">
//               <b>Genres: </b>
//               {animeList.genres.map((l) => l + " ") || "N/A"}
//             </p>
//             <p className="text-left">
//               <b>Status: </b>
//               {animeList.status}
//             </p>
//             <p className="text-left">
//               <b>Sub Or Dub: </b>
//               {animeList.subOrDub}
//             </p>
//             <p className="text-left">
//               <b>Total Episodes:</b> {animeList.totalEpisodes}
//             </p>
//             {animeList.totalEpisodes !== animeList.currentEpisode && (
//               <p className="text-left">
//                 <b>Current Episodes:</b> {animeList.currentEpisode}
//               </p>
//             )}
//             <div style={{
//                 margin: "25px"
//             }}>
//             <Link
//               to={{
//                 pathname: "/watch",
//                 search: `?query=${animeList.id}`,
//               }}
//             >
//               <button className="px-2 py-1  text-white bg-blue-500 rounded hover:bg-blue-600 ">
//                 WATCH NOW
//               </button>
//             </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
