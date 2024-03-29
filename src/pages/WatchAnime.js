import React, { useState, useEffect } from "react";
import "../main.css";
import MY_Navbar2 from "../components/Navbar_2";

import "./WatchAnime.css";
import { useNavigate, useLocation } from "react-router-dom";

import PlyrComponent from "../components/VideoPlayer";

import Error404 from "../components/error404";
import Custom_Footer from "../components/footer";
import CustomSlider1 from "../components/CustomSlider";

import Skeleton from "react-loading-skeleton";

function Watch() {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const navigate = useNavigate();
  const location = useLocation();

  const [IsMore, setIsMore] = useState(false);

  const [Query, setQuery] = useState("");
  const [animeList, setAnimeList] = useState({});
  const [WatchUrl, setWatchUrl] = useState("");
  const [currentEp, setCurrentEp] = useState(0);

  const [Titles, setTitles] = useState([]);

  const [TotalEP, setTotalEP] = useState([]);
  const [EP, setEP] = useState(1);

  const [Description, setDescription] = useState("");

  const [dataLoaded, setDataLoaded] = useState(false);
  const [EpLoaded, setEpLoaded] = useState(false);

  const [Error, setError] = useState(false);

  const [selectedRange, setSelectedRange] = useState("0-10"); // State for selected range

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value); // Update selected range
  };


  const fetchAnimeInfo = async (id) => {
    setDataLoaded(false);
    const response = await fetch(`${API_ENDPOINT}/meta/anilist/info/${id}`); // Zoro
    const data = await response.json();
    const animeList = data;
    console.log("ANIME: ", data);
    setAnimeList(animeList);
    if (typeof animeList.title === "object") {
      const Titles = animeList.title["english"];
      setTitles(Titles);
    } else if (typeof animeList.title === "array") {
      const Titles = animeList.title[0];
      setTitles(Titles);
    } else {
      const Titles = animeList.title;
      setTitles(Titles);
    }
    if (
      animeList.episodes === undefined ||
      animeList.episodes.length === 0 ||
      animeList.episodes === null
    ) {
      setEpLoaded(true);
      setDataLoaded(true);
      setDescription(animeList.description);
      setError(true);
    } else {
      setEpLoaded(true);
      const TotalEP = animeList.episodes;
      console.log("EP: ", TotalEP);
      setTotalEP(TotalEP);
      fetchM3U8(TotalEP[0].id);
      setCurrentEp(1)
      setDescription(
        animeList.description
          ? animeList.description
          : "No description available"
      );
      setDataLoaded(true);
    }
  };
  const fetchM3U8 = async (id) => {
    const data = await fetch(`${API_ENDPOINT}/meta/anilist/watch/${id}`); // Zoro
    const anime_link = await data.json();
    const WatchUrl = anime_link.sources[anime_link.sources.length - 1].url;
    setWatchUrl(WatchUrl);
  };

  function sliceObject(obj, start, end) {
    const slicedEntries = Object.entries(obj).slice(start, end);
    return Object.values(Object.fromEntries(slicedEntries));
  }

  useEffect(() => {
    const Query = new URLSearchParams(location.search).get("query");
    setQuery(Query);
    if (Query === undefined || Query === null || Query === "") {
      navigate("/home");
    } else {
      fetchAnimeInfo(Query);
    }
  }, []);

  return (
    <div className={`app`}>
      <MY_Navbar2 />
      <div>
        <h1 className="xl:text-2xl m-5"> {Titles}</h1>

        <div className="relative w-full h-[100vh] sm:w-fit md:w-fit lg:w-[500px] xl:w-full xl:col-span-2 lg:col-span-1 col-span-1 object-contain flex justify-center">


          {dataLoaded && (
            <>
              <PlyrComponent QualityData={WatchUrl} />
            </>
          )}
          {!dataLoaded && (
            <Skeleton
            style={{
              width: "100%",
              height: "100%"
            }}
             className="absolute  z-50" height={"100vh"} width={"100vw"} baseColor="#2b2b2b" highlightColor="#000" />
          )}

          {Error && (
            <div className="m-auto">
              <Error404 />
            </div>
          )}
        </div>
        <div className="relative">
          <h2 className="absolute text-4xl md:text-6xl font-bold text-white m-14 w-1/4">
            Watch <br /> Next
            <div className="m-4 absolute left-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="green"
                height="50px"
                width="50px"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 330 330"
                xmlSpace="preserve"
              >
                <path
                  id="XMLID_27_"
                  d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255  s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0  c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
                />
              </svg>
            </div>
          </h2>

          {/* Select Bar for choosing episode range */}
          <form className="max-w-sm mx-auto">
            <label htmlFor="episode_range_select" className="sr-only">
              Select episode range
            </label>
            <select
              id="episode_range_select"
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              onChange={handleRangeChange}
            >
              {/* Map the episodes in parts of 10 */}
              {TotalEP.map((_, index) =>
                index % 10 === 0 ? (
                  <option
                    key={index}
                    value={`${index}-${Math.min(
                      index + 9,
                      TotalEP.length - 1
                    )}`}
                  >
                    {`${index + 1}-${Math.min(index + 10, TotalEP.length)}`}
                  </option>
                ) : null
              )}
            </select>
          </form>

          {/* Pass selected range and fetch function to CustomSlider1 */}
          <div className="relative">
            {dataLoaded ? (
              <CustomSlider1
                EpList={sliceObject(
                  TotalEP,
                  parseInt(selectedRange.split("-")[0]), // Subtract 1 to convert episode numbers to array indices
                  parseInt(selectedRange.split("-")[1]) + 1
                )}
                fetchM3U8={fetchM3U8}
              />
            ) : (
              <div className="relative w-3/4 m-4 justify-between flex flex-row -right-[30%]">
                <Skeleton
                  width={"200px"}
                  height={"300px"}
                  className="absolute"
                  baseColor="#2b2b2b"
                  highlightColor="#000"
                />
                <Skeleton
                  width={"200px"}
                  height={"300px"}
                  className="absolute"
                  baseColor="#2b2b2b"
                  highlightColor="#000"
                />
                <Skeleton
                  width={"200px"}
                  height={"300px"}
                  className="absolute"
                  baseColor="#2b2b2b"
                  highlightColor="#000"
                />
                <Skeleton
                  width={"200px"}
                  height={"300px"}
                  className="absolute"
                  baseColor="#2b2b2b"
                  highlightColor="#000"
                />
                <Skeleton
                  width={"200px"}
                  height={"300px"}
                  className="absolute"
                  baseColor="#2b2b2b"
                  highlightColor="#000"
                />
              </div>
            )}
          </div>
        </div>
        <div className="relative w-fit xl:w-8/12 lg:w-6/12 justify-items-end bottom-0  xl:-right-20 lg:relative lg:-right-36 flex flex-row">
        {/* <div 
        className="w-screen h-full absolute z-0 left-0 bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: "url(" + animeList.cover +" ) ",
          filter: "blur(20px)"
        }}
        /> */}
          <div className="m-6">
            {dataLoaded ? (
              <img src={animeList.image} className="" />
            ) : (
              <Skeleton
                width={"300px"}
                height={"420px"}
                className="absolute"
                baseColor="#2b2b2b"
                  highlightColor="#000"
              />
            )}
          </div>
          <p
            className={`w-fit text-left col-span-1 ${
              !IsMore ? "h-[100%]" : "flex"
            } overflow-hidden  mt-8 m-6`}
          >
            {dataLoaded ? (
              Description
            ) : (
              <Skeleton
                width={"100vh"}
                height={"20%"}
                count={5}
                baseColor="#2b2b2b"
                  highlightColor="#000"
                className="m-1 p-1"
              />
            )}
          </p>
          {/* {Description && Description.length >= 125 && (
            <div
              className="cursor-pointer font-sans font-bold"
              onClick={() => {
                setIsMore(!IsMore);
              }}
            >
              {!IsMore ? "+ Show More" : "- Show Less"}
            </div>
          )} */}
        </div>
      </div>
      <Custom_Footer />
    </div>
  );
}

export default Watch;
