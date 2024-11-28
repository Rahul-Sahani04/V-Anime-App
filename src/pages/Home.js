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
        `${API_ENDPOINT}/api/v2/hianime/home`
      );
      const data = await response.json();
      setProducts(data.data.spotlightAnimes);
      console.log(data.data.spotlightAnimes);
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
      {products && (
        <HeroParallax products={products} />
      )}
      <CustomFooter />
    </div>
  );
}

export default Home;
