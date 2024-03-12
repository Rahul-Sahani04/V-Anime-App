import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Top_anime from "./pages/Top_anime";
import Search from "./pages/Search";
import Watch from "./pages/WatchAnime";
import AnimeDetails from "./pages/Details";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Random_image from "./pages/RandomImage";


function ErrorBoundary({ error }) {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full relative top-1/2 left-1/2 transform -translate-x-1/2 translate-y-3/4">
      <div class="text-center">
        <h1 class="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p class="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
        <div class="animate-bounce">
          <svg
            class="mx-auto h-16 w-16 text-red-500"
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
        <p class="mt-4 text-gray-600 text-base ">
          Let's get you back{" "}
          <a href="/" class="text-blue-500">
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
