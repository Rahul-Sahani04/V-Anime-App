
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import MyNavbar from "../components/Navbar/Navbar_2";
import PlyrComponent from "../components/VideoPlayer";
import Error404 from "../components/error404";
import CustomFooter from "../components/footer";
import Skeleton from "react-loading-skeleton";
import StreamingInterface from "../components/EpisodeInterface";
import "../main.css";
import "./WatchAnime.css";
import toast from "react-hot-toast";

export default function Watch() {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const navigate = useNavigate();
  const location = useLocation();

  const [animeList, setAnimeList] = useState({});
  const [watchUrl, setWatchUrl] = useState("");
  const [currentEp, setCurrentEp] = useState(0);
  const [totalEP, setTotalEP] = useState([]);
  const [description, setDescription] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [epLoaded, setEpLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [servers, setServers] = useState([]);
  const [streamingLinks, setStreamingLinks] = useState([]);

  const [moreInfo, setMoreInfo] = useState({});

  const handleServerSelection = async (server, category) => {
    const sources = await fetchEpisodeSources(
      currentEp,
      server.serverName,
      category
    );
    setStreamingLinks(sources.sources);
  };

  const fetchAnimeInfo = async (id, epInUrl) => {
    setDataLoaded(false);
    try {
      const response = await fetch(`${API_ENDPOINT}/api/v2/hianime/anime/${id}`);
      const data = await response.json();
      setAnimeList(data.data.anime);

      const ep_response = await fetch(`${API_ENDPOINT}/api/v2/hianime/anime/${id}/episodes`);
      const ep_data = await ep_response.json();
      setTotalEP(ep_data.data.episodes);
      
      const moreInfo = await getAdditionData(data.data.anime.info.malId);
      setMoreInfo(moreInfo);


      setCurrentEp(epInUrl ? epInUrl : ep_data.data.episodes[0].episodeId);
      setDescription(data.data.anime.description || "No description available");
      setEpLoaded(true);
      setDataLoaded(true);
    } catch (error) {
      setError(true);
    }
  };

  const fetchEpisodeServers = async (animeEpisodeId) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/v2/hianime/episode/servers?animeEpisodeId=${animeEpisodeId}`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      setError(true);
    }
  };

  const fetchEpisodeSources = async (animeEpisodeId, server, category) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/v2/hianime/episode/sources?animeEpisodeId=${animeEpisodeId}&server=${server}&category=${category}`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      setError(true);
    }
  };


  // Utility function to generate a random room ID
  const generateRandomRoomId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    const episode = new URLSearchParams(location.search).get("epId") || false;

    if (episode) {
      setCurrentEp(episode);
    }

    if (!query) {
      navigate("/home");
    } else {
      fetchAnimeInfo(query, episode);
    }
  }, [location.search]);

  useEffect(() => {
    if (currentEp) {
      fetchEpisodeServers(currentEp).then(setServers);
    }
  }, [currentEp]);


  const getAdditionData = async (malId) => {
    try {
      const result = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
      const data = await result.json();
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  async function addToWatchHistory() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const user = JSON.parse(atob(token.split(".")[1]));
      const userId = user.id;
      const animeId = animeList.id;
      try {
        await axios.post(
          `${API_ENDPOINT}/user/add-video-to-watchlist`,
          { user: userId, animeId: animeId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        // Handle error silently or show a user-friendly message 
        toast.error("Failed to add to watch history");
      }
    }
  }

  useEffect(() => {
    if (dataLoaded) {
      addToWatchHistory();
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (servers && servers.sub) {
      handleServerSelection(servers.sub[0], "sub");
    }
  }, [servers]);

  useEffect(() => {
    if (streamingLinks.length > 0) {
      setWatchUrl(streamingLinks[0].url);
    }
  }, [streamingLinks]);

  return (
    <div className="app bg-black overflow-auto">
      <MyNavbar />
      <div>
        <h1 className="xl:text-2xl m-5">{animeList.info?.name}</h1>

        <div className="relative w-full h-[100vh] sm:w-fit md:w-fit lg:w-full xl:w-full xl:col-span-2 lg:col-span-1 col-span-1 object-contain flex justify-center">
        <Link to={`/watchtogether?query=${animeList.info?.id}&create=true&roomId=${generateRandomRoomId()}`} className="absolute w-fit top-0 right-2 z-[99] px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition-colors">
              <div className="">
              Watch Together
              </div>
            </Link>
          {dataLoaded && <PlyrComponent QualityData={watchUrl} />}
          {!dataLoaded && (
            <Skeleton
              style={{ width: "100%", height: "100%" }}
              className="absolute z-50"
              height="100vh"
              width="100vw"
              baseColor="#2b2b2b"
              highlightColor="#000"
            />
          )}
          {error && (
            <div className="m-auto">
              <Error404 />
            </div>
          )}
        </div>

        {servers && (
          <div className="server-selection bg-gray-900 p-4 rounded-lg mt-4 flex justify-between text-center">
            {['sub', 'dub', 'raw'].map((type) => 
              servers[type] && (
                <div key={type} className="mb-4">
                  <h3 className="text-white text-lg font-semibold mb-2 capitalize">{type} Servers</h3>
                  <div className="flex flex-wrap gap-2">
                    {servers[type]
                    .map((server) => (
                      <button
                        key={server.serverId}
                        onClick={() => handleServerSelection(server, type)}
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                      >
                        {server.serverName}
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
            

        {epLoaded && (
          <StreamingInterface
            anime_id={animeList.info.id}
            episodes={totalEP}
            seasonG={animeList.info.name}
            poster={animeList.info.poster}
          />
        )}

        <h2 className="text-2xl font-bold flex items-center gap-2 text-white mx-8 mt-16">
            <span className="w-1 h-6 bg-red-500 rounded-full" />
            Details
          </h2>
        <div className="relative w-full xl:w-10/12 lg:w-6/12 justify-items-end bottom-0 xl:-right-20 lg:relative lg:-right-36 flex flex-row">
          <div className="m-6">
            {dataLoaded ? (
              <img src={animeList.info?.poster} alt={animeList.info?.name} className="rounded-lg shadow-lg" />
            ) : (
              <Skeleton
                width="300px"
                height="420px"
                className="absolute"
                baseColor="#2b2b2b"
                highlightColor="#000"
              />
            )}
          </div>
          <p className="w-full text-left text-white col-span-1 mt-8 m-6 overflow-hidden">
            {dataLoaded ? (
              moreInfo?.synopsis
            ) : (
              <Skeleton
                width="100vh"
                height="20%"
                count={5}
                baseColor="#2b2b2b"
                highlightColor="#000"
                className="m-1 p-1"
              />
            )}
          </p>
        </div>
        <div className="pt-8 mx-8 my-12">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <span className="w-1 h-6 bg-red-500 rounded-full" />
            Trailer
          </h2>

          {/* Embed YT URL */}
          <div className="flex justify-center">
            <iframe
              width="560"
              height="315"
              src={moreInfo?.trailer?.embed_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
        </div>
          
        </div>
      </div>

      <CustomFooter />
    </div>
  );
}

