import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from './App';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Pop_anime from './pages/Pop_anime';
import Top_anime from './pages/Top_anime';
import Search from './pages/Search';
import Watch from './pages/WatchAnime';
import AnimeDetails from './pages/Details';

import {
  createBrowserRouter,
  RouterProvider,
 } from "react-router-dom";
import Random_image from './pages/RandomImage';


const router = createBrowserRouter([
  {
   path: "/",
   element: <App />,
  },
  {
   path: "/home",
   element: <Home />,
  },
  {
   path: "/search",
   element: <Search />,
  },
  {
   path: "/movie",
   element: <Movie />,
  },
  {
   path: "/popular",
   element: <Pop_anime />,
  },
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