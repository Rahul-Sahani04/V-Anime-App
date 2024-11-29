import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar_2";
import PlyrComponent from "../components/VideoPlayer";
import Error404 from "../components/error404";
import CustomFooter from "../components/footer";
import Skeleton from "react-loading-skeleton";
import StreamingInterface from "../components/EpisodeInterface";
import "../main.css";
import "./WatchAnime.css";
import toast from "react-hot-toast";

import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Info } from "lucide-react";

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
      const response = await fetch(
        `${API_ENDPOINT}/api/v2/hianime/anime/${id}`
      );
      const data = await response.json();
      setAnimeList(data.data.anime);

      const ep_response = await fetch(
        `${API_ENDPOINT}/api/v2/hianime/anime/${id}/episodes`
      );
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
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16 px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-3xl font-bold mb-4">{animeList.info?.name}</h1>

        <div className="relative group aspect-video mb-8 border border-stone-500 rounded-xl overflow-hidden ">
        
          <Link
            to={`/watchtogether?query=${
              animeList.info?.id
            }&create=true&roomId=${generateRandomRoomId()}`}
            className="absolute top-4 right-4 z-10 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Watch Together
          </Link>
          <div
                class="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
            </div>
            <div className="ring-2 ring-gray-900/5 " />
          {dataLoaded ? (
            <PlyrComponent QualityData={watchUrl} />
          ) : (
            <div className="w-full h-full bg-gray-800 animate-pulse"></div>
          )}
          {error && <Error404 />}
        </div>

        {servers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 p-6 rounded-lg mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Servers</h2>
            <div className="flex flex-wrap gap-4">
              {["sub", "dub", "raw"].map(
                (type) =>
                  servers[type] && (
                    <div key={type} className="flex-1 min-w-[200px]">
                      <h3 className="text-lg font-medium mb-2 capitalize">
                        {type}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {servers[type].map((server) => (
                          <button
                            key={server.serverId}
                            onClick={() => handleServerSelection(server, type)}
                            className="px-3 py-1 bg-gray-800 text-sm rounded hover:bg-gray-700 transition-colors"
                          >
                            {server.serverName}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </motion.div>
        )}

        {epLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StreamingInterface
              anime_id={animeList.info.id}
              episodes={totalEP}
              seasonG={animeList.info.name}
              poster={animeList.info.poster}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <Info size={36} color="#ef4444"/>
            Details
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              {dataLoaded ? (
                <img
                  src={animeList.info?.poster}
                  alt={animeList.info?.name}
                  className="w-full rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-gray-800 animate-pulse rounded-lg"></div>
              )}
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-300 mb-6">
                {dataLoaded ? (
                  moreInfo?.synopsis
                ) : (
                  <>
                    <div className="w-full h-4 bg-gray-800 animate-pulse mb-2"></div>
                    <div className="w-full h-4 bg-gray-800 animate-pulse mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-800 animate-pulse"></div>
                  </>
                )}
              </p>
              <h3 className="text-xl font-semibold mb-4 flex gap-x-2">
                <span className="text-2xl font-bold w-1 h-6 bg-red-500 rounded-full" />
                Trailer
              </h3>
              <div className="aspect-video h-1/2">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={moreInfo?.trailer?.embed_url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; mute; autoplay"
                  allowFullScreen
                  autoplay="false"
                  autostart="false"
                  muted
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <CustomFooter />
    </div>
  );
}
