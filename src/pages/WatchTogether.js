import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import io from "socket.io-client";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import PlyrComponent from "../components/VideoPlayer";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar/Navbar_2";

const WatchTogether = ({ socket }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const videoRef = useRef(null);

  const [videoState, setVideoState] = useState({
    currentTime: 0,
    volume: 1,
    paused: true,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);

  const [animeList, setAnimeList] = useState({});
  const [WatchUrl, setWatchUrl] = useState("");
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
    console.log("Sources: ", sources.sources[0].url);
    setStreamingLinks(sources.sources[0].url);
    setWatchUrl(sources.sources[0].url);
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
      console.log("Servers: ", data.data);
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

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    const episode = new URLSearchParams(location.search).get("epId") || false;

    if (episode) {
      setCurrentEp(episode);
    }

    if (!query) {
      // navigate("/home");
      toast.error("No anime found");
    } else {
      fetchAnimeInfo(query, episode);
    }
  }, [location.search]);

  useEffect(() => {
    if (currentEp) {
      fetchEpisodeServers(currentEp).then(setServers);
    }
  }, [currentEp]);

  useEffect(() => {
    console.log("Servers: ", servers);
    if (servers && servers.sub ) {
      handleServerSelection(servers.sub[0], "sub");
    } else if (servers && servers.dub) {
      handleServerSelection(servers.dub[0], "dub");
    }
  }, [servers]);

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
  
  useEffect(() => {
    if (videoRef.current && videoRef.current.plyr) {
      // On video playing toggle values
      videoRef.current.plyr.onplaying = function () {
        console.log("isPlaying: ", isPlaying);
        setIsPlaying(true);
      };
      
      // On video pause toggle values
      videoRef.current.plyr.onpause = function () {
        console.log("isNotPlaying: ", isPlaying);
        setIsPlaying(false);
      };
    }
  }, [videoRef.current, videoRef.current?.plyr]);
  

  // Play video function
  async function playVid() {
    if (videoRef.current.plyr.paused && !isPlaying) {
      return videoRef.current.plyr.play();
    }
  }

  // Pause video function
  function pauseVid() {
    if (!videoRef.current.plyr.paused && isPlaying) {
      videoRef.current.plyr.pause();
    }
  }

  // ! Watch Together Code AHEAD

  // const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [host, setHost] = useState(false);

  const URL_Search = new URLSearchParams(location.search);
  const [CustomRoomId, setCustomRoomId] = useState(URL_Search.get("roomId"));

  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const { roomId } = useParams(); // Get roomId from URL params

  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  useEffect(() => {
    // videoRef.current.plyr.controls = false;

    let CustomRoomId =
      URL_Search.get("roomId") || "" || URL_Search.get("roomId");
    console.log("Room Id: ", CustomRoomId);
    setCustomRoomId(CustomRoomId);

    console.log(CustomRoomId);
    if (window.location.search.includes("create=true")) {
      socket.emit(
        "createRoom",
        CustomRoomId || URL_Search.get("roomId"),
        userName
      );
    }
    socket.emit("joinRoom", CustomRoomId || URL_Search.get("roomId"), userName); // Join the specified room
  }, [socket, roomId, userName]);

  useEffect(() => {
    console.log("USERNAME: ", localStorage.getItem("userName"));
    // Initialize Plyr player
    const player = new Plyr(videoRef.current.plyr);

    // Connect to Socket.IO server
    // const socket = io("http://localhost:4000");

    if (!userName && userName !== "") {
      var Name = prompt("Please enter a username");
      console.log(Name);
      setUserName(Name);
      localStorage.setItem("userName", Name);
    }
    socket.emit("newUser", { userName, socketID: socket.id });

    socket.on("roomCreated", (roomId) => {
      // Handle the created room data
      // Update the room ID in the state or display it to the user
    });

    socket.on("videoPlaybackStatus", (status) => {
      // Handle the received video playback status
      // Update the video playback status in the Plyr player
      if (!host) {
        console.log("Playback updated: ");

        videoRef.current.plyr.currentTime = status.currentTime;
        videoRef.current.plyr.volume = status.volume;
        if (!status.paused) {
          playVid();
        } else if (status.paused) {
          pauseVid();
        }
      }
    });

    socket.on("videoPlaybackStatusUpdated", (status) => {
      // Handle the received video playback status
      // Update the video playback status in the Plyr player
      console.log("Playback updated");
    });

    // Emit a message to the server
    const sendMessage = (message) => {
      socket.emit("message", message);
    };

    // Emit typing event to the server
    const sendTyping = () => {
      socket.emit("typing");
    };

    // Emit not typing event to the server
    const sendNotTyping = () => {
      socket.emit("notTyping");
    };

    // Emit new user event to the server
    const sendNewUser = (user) => {
      socket.emit("newUser", user);
    };

    // Clean up the interval to avoid memory leaks

    // Disconnect from the server
    const disconnect = () => {
      socket.disconnect();
    };

    return () => {
      // Clean up the event listeners and disconnect from the server
      player.destroy();
      disconnect();
    };
  }, []);

  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    console.log(socket.id);

    console.log("Joining room: ", CustomRoomId, userName);

  }, [socket, messages, roomId]);

  // Emit update video playback status event to the server
  const updateVideoPlaybackStatus = (status) => {
    socket.emit("updateVideoPlaybackStatus", status, CustomRoomId);
    // socket.emit("videoPlaybackStatus", status);
  };

  useEffect(() => {
    socket.on("isHost", (data) => {
      console.log("Im the host");
      setHost(true);
      videoRef.current.plyr.controls = true;
    });

    if (host) {
      const interval = setInterval(() => {
        console.log("PLYR: ", videoRef.current.plyr);
        console.log("Updating Playback Status: ", {
          currentTime: videoRef.current.plyr.currentTime,
          volume: videoRef.current.plyr.volume,
        });
        updateVideoPlaybackStatus({
          currentTime: videoRef.current.plyr.currentTime,
          paused: videoRef.current.plyr.paused,
          volume: videoRef.current.plyr.volume,
        });
      }, 10000); // Interval set to 10 seconds

      // Clean up the interval to avoid memory leaks
      return () => clearInterval(interval);
    } else {
      console.log("Not the host");
    }
  }, [host]); // Only run the effect when host status changes

  

  return (
    <>
    <Navbar />
    <div className="flex justify-evenly pt-16">
      <div id="VideoContainer" className="w-5/6 border  border-gray-600 rounded-xl">
        <PlyrComponent
          className=""
          playerRef={videoRef}
          controls={host ? true : false}
          QualityData={WatchUrl && WatchUrl}
        />
      </div>
      <ChatComponent socket={socket} />
    </div>
    </>
  );
};

export default WatchTogether;