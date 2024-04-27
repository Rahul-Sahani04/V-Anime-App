import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../main.css";
// import ThemeToggleButton from "../components/toggleTheme";
import MyNavbar from "../components/Navbar/Navbar_2";
import Recom from "./Recom";
import AnimeCarousel from "../components/AnimeCarousel";
import CustomFooter from "../components/footer";
import { HeroParallax } from "../components/ui/hero-parallax";

import 'react-loading-skeleton/dist/skeleton.css'

function Home() {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnime = async () => {
    setIsLoading(true);
    try{

      const response = await fetch(
        `${API_ENDPOINT}/meta/anilist/trending?page=1&perPage=10`
      );
      const data = await response.json();
      setProducts(data.results);
      console.log(data.results);
    } catch(error){
      console.error("An error occured: ", error)
    }
    setIsLoading(false);
  };
  useEffect(() => {
    console.log(API_ENDPOINT)
    fetchAnime();
  }, []);

  return (
    <div>
      <MyNavbar />
      <HeroParallax products={products} />
      <CustomFooter />
    </div>
  );
}

export default Home;
