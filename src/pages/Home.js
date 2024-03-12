import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../main.css";
import ThemeToggleButton from "../components/toggleTheme";
import MY_Navbar2 from "../components/Navbar_2";
import Recom from "./Recom";
import AnimeCarousel from "../components/AnimeCarousel";
import Custom_Footer from "../components/footer";
import { HeroParallax } from "../components/ui/hero-parallax";

function Home() {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnime = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${API_ENDPOINT}/meta/anilist/trending?page=1&perPage=10`
    );
    const data = await response.json();
    setProducts(data.results);
    console.log(data.results);
    setIsLoading(false);
  };
  useEffect(() => {
    console.log(API_ENDPOINT)
    fetchAnime();
  }, []);

  return (
    <div>
      <MY_Navbar2 />
      <HeroParallax products={products} />
      <Custom_Footer />
    </div>
  );
}

export default Home;
