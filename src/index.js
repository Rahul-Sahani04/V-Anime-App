import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import Home from "./pages/Home";
// import Movie from "./pages/Movie";
import Top_anime from "./pages/Top_anime";
import Search from "./pages/Search";
import Watch from "./pages/WatchAnime";
import AnimeDetails from "./pages/Details";

import ChatHome from "./components/ChatComponent/ChatHome";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Random_image from "./pages/RandomImage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/Terms_Conditions";

import socketIO from "socket.io-client"
import WatchTogether from "./pages/WatchTogether";
import { SignupFormDemo } from "./pages/SignUp";
import { LoginFormDemo } from "./pages/LogIn";
import ProfilePage from "./pages/ProfilePage";

let socketId = localStorage.getItem("socketId");

if (!socketId) {
  socketId = Math.random().toString(36).substring(8);
  localStorage.setItem("socketId", socketId);
}

const socket = socketIO.connect("http://localhost:8000", {
  query: { socketId },
});

function ErrorBoundary({ error }) {

  return (
    <div className="h-screen w-screen absolute z-50 top-0 left-0 bg-black flex justify-center items-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600 text-base ">
          Let's get you back{" "}
          <a href="/" className="text-blue-500">
            home
          </a>
          .
        </p>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/register",
    element: <SignupFormDemo />,
  },
  {
    path: "/login",
    element: <LoginFormDemo />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  // {
  //  path: "/movie",
  //  element: <Movie />,
  // },
  {
    path: "/top_anime",
    element: <Top_anime />,
  },
  {
    path: "/details/",
    element: <AnimeDetails />,
  },
  {
    path: "/watch",
    element: <Watch />,
  },
  {
    path: "/watch/:id",
    element: <Watch />,
  },
  {
    path: "/random_img",
    element: <Random_image />,
  },
  {
    path: "/terms",
    element: <TermsAndConditions />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/user",
    element: <ProfilePage />,
  },
  {
    path: "/watchHome",
    element: <ChatHome socket={socket} />,
  },
  {
    path: "/watchtogether",
    element: <WatchTogether  socket={socket} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
