import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatPage.css";

import InputField from "../InputField";

const ChatHome = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  
  const handleCreateRoom = () => {
    if (!userName) {
      alert("Please enter a username");
      return;
    }
    if (!roomName) {
      alert("Please enter a room name");
      return;
    }
    let CustomRoomId = roomName.split(" ").join("-").toLocaleLowerCase();
    socket.emit("createRoom", CustomRoomId, userName);
    localStorage.setItem("userName", userName);
    localStorage.setItem("roomName", roomName);
    socket.emit("newUser", { userName, userName: userName });
    navigate("/watchtogether?roomId=" + CustomRoomId);
  };

  const handleJoinRoom = () => {
    socket.emit("joinRoom", roomName);
    navigate("/chat");
  };

  useEffect(() => {
    console.log(socket.id);
    socket.emit("getCurrentRooms");
    socket.on("currentRooms", (rooms) => {
      console.log(rooms);
    });
  }, []);

  return (
    <form className="home__container text-white">
      <h2 className="home__header text-xl">Sign in to Watch Together</h2>
      <label htmlFor="username">Username</label>
      <InputField
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChangeFunc={(e) => setUserName(e.target.value)}
      />
      <br />
      <div className="room__actions">
        <label htmlFor="roomName" className="p-4">Room Name</label>
        <InputField
          type="text"
          name="roomName"
          id="roomName"
          className="room__input "
          value={roomName}
          onChangeFunc={(e) => setRoomName(e.target.value)}
        />
        <br />
        <br />
        <button
          type="button"
          onClick={handleCreateRoom}
          className="room__cta home__cta"
        >
          Create Room
        </button>
        <br />
        <br />
        <button
          type="button"
          onClick={handleJoinRoom}
          className="room__cta home__cta"
        >
          Join Room
        </button>
      </div>
    </form>
  );
};

export default ChatHome;
