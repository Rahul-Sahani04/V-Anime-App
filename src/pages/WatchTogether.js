import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import io from "socket.io-client";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import PlyrComponent from "../components/VideoPlayer";

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
    if (animeList.episodes === undefined || animeList.episodes.length === 0) {
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
      setCurrentEp(1);
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
    console.log(WatchUrl);
  };

  function sliceObject(obj, start, end) {
    const slicedEntries = Object.entries(obj).slice(start, end);
    return Object.values(Object.fromEntries(slicedEntries));
  }
  
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

  useEffect(() => {
    const Query = new URLSearchParams(location.search).get("query");
    setQuery(Query);
    if (Query === undefined || Query === null || Query === "") {
      navigate("/home");
    } else {
      fetchAnimeInfo(Query);
    }
  }, []);

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
    }
  }, [host]); // Only run the effect when host status changes

  

  return (
    <div className="flex justify-evenly">
      <div id="VideoContainer" className="w-5/6 ">
        <PlyrComponent
          className=""
          playerRef={videoRef}
          controls={host ? true : false}
          QualityData={WatchUrl && WatchUrl}
        />
      </div>
      <ChatComponent socket={socket} />
    </div>
  );
};

export default WatchTogether;
