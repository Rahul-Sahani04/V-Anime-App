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
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Random_image from './pages/RandomImage';
var router = createBrowserRouter([
    {
        path: "/",
        element: React.createElement(App, null),
    },
    {
        path: "/home",
        element: React.createElement(Home, null),
    },
    {
        path: "/search",
        element: React.createElement(Search, null),
    },
    {
        path: "/movie",
        element: React.createElement(Movie, null),
    },
    {
        path: "/popular",
        element: React.createElement(Pop_anime, null),
    },
    {
        path: "/top_anime",
        element: React.createElement(Top_anime, null),
    },
    {
        path: "/watch",
        element: React.createElement(Watch, null),
    },
    {
        path: "/watch/:id",
        element: React.createElement(Watch, null),
    },
    {
        path: "/random_img",
        element: React.createElement(Random_image, null),
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(RouterProvider, { router: router }));
