import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";

import "./hero-parallax.css";
export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh]  py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={
                product.title.english
                  ? product.title.english
                  : product.title.native
              }
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={
                product.title.english
                  ? product.title.english
                  : product.title.native
              }
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={
                product.title.english
                  ? product.title.english
                  : product.title.native
              }
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  // Function to handle search input change
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Function to handle "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Redirect user to a new page with the search value
      navigate(`/search?query=${searchValue}`);
    }
  };
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-white">
        Ultimate Anime <br /> Streaming Experience
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200 text-neutral-200 text-left">
        Immerse yourself in a world of captivating stories and stunning visuals.
        Our platform brings you the best anime content with cutting-edge
        streaming technology. Join a community of passionate fans and explore a
        vast library of anime at your fingertips.
      </p>

      <form className="searchForm">
        <label for="search" className="label">
          <input
            className="input"
            type="text"
            required=""
            placeholder="Search Product"
            id="search"
            onChange={handleInputChange} // Call handleInputChange on input change
            onKeyPress={handleKeyPress} // Call handleKeyPress on key press
          />
          <div className="fancy-bg"></div>
          <div className="search">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="svg r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </div>
        </label>
      </form>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        to={{
          pathname: "/details",
          search: `?id=${product.id}`,
        }}
        className="block group-hover/product:shadow-2xl "
      >
        <img
          src={product.image}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        <>
          {product.title.english ? product.title.english : product.title.native}
        </>
      </h2>
    </motion.div>
  );
};
