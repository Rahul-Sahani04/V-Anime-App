import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ChatComponent.css";

const ChatComponent = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState(false);
  const [messageInput, setMessageInput] = useState(""); // State for input message
  const lastMessageRef = useRef(null);

  const navigate = useNavigate();
  const { roomId } = useParams(); // Get roomId from URL params

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      socket.emit("message", {
        text: messageInput,
        name: localStorage.getItem("userName"),
        socketID: socket.id,
        roomJoinMsg: false,
      });
      setMessageInput("");
    }
  };

  useEffect(() => {
    // Event listener for incoming messages
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
    // Event listener for typing status
    socket.on("typingResponse", (data) => setTypingStatus(data));
    socket.on("notTypingResponse", () => setTypingStatus(""));


    socket.on("roomJoined", (data) => {
      console.log(data.name + " joined the room");
      setMessages([...messages, {text: data.name + " joined the room", name: "System"}]);
      console.log("HOst mes: ", messages);
    });

    // Join the specified room
    socket.emit("joinRoom", roomId);

    // Redirect to chat page if username not set
    const userName = localStorage.getItem("userName");
    if (!userName || userName === "") {
      navigate("/watchtogether");
    } else {
      // Emit new user event
      socket.emit("newUser", { userName, socketID: socket.id });
    }
  }, [socket, messages, roomId]);

  useEffect(() => {
    // Scroll to the last message when new message arrives
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Timeout function if the user doesnt type for 1 second
  let typingTimeout = null;
  const handleTyping = () => {
    // Emit typing event
    socket.emit("typing", { name: localStorage.getItem("userName"), roomId });
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("notTyping", { roomId });
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-nav-bar">
        <a>Chat</a>
        <div className="chat-close">
          <div className="chat-line one"></div>
          <div className="chat-line two"></div>
        </div>
      </div>
      <div className="chat-messages-area">
        {messages.map((message, index) => {
          return index % 2 == 0 ? (
            <div key={index} className="chat-message one">
              {message.name.slice(0, 6)}: {message.text}
            </div>
          ) : (
            <div key={index} className="chat-message two">
            {message.name.slice(0, 6)}: {message.text}
            </div>
          );
        })}
        <div ref={lastMessageRef}></div>
      </div>
      <div className="text-white  px-4 py-0">
         {typingStatus && <div className="chat-typing">{typingStatus.name} is typing...</div>}
      </div>
      <div className="chat-sender-area">
        <div className="chat-input-place">
          <input
            placeholder="Send a message."
            className="chat-send-input"
            type="text"
            value={messageInput}
            onChange={(e) => {
              setMessageInput(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage(e); // Send message on Enter key press
            }}
          />
          <div className="chat-send" onClick={handleSendMessage}>
            <svg
              className="chat-send-icon"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    fill="#6B6C7B"
                    d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
