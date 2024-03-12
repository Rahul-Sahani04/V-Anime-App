import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import "./Navbar2.css";

const MY_Navbar2 = () => {
  const [openNav, setOpenNav] = useState(false);
  const [Query, setQuery] = useState('');
  const [isSearchActive, setSearchActive] = useState(false);

  const ToggleAll = () => {
    setOpenNav(!openNav);
    setSearchActive(false);
  }

  const ToggleSearch = () => {
    setSearchActive(!isSearchActive);
    setOpenNav(false);
  }

  useEffect(() => {
    // Your logic to set Query from location.search
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/home" className="flex items-center">
          Home
        </Link>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/search" className="flex items-center">
          Search
        </Link>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/top_anime" className="flex items-center">
          Top Anime
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/random_img" className="flex items-center">
          Random Image
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className='w-full sticky'>
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-zinc-950">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as={Link}
            to="/home"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            V-Anime
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                className="hidden text-white lg:inline-block"
              >
                <span>Log In</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Sign in</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={ToggleAll}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" onClick={ToggleSearch}>
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" onClick={ToggleSearch}>
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
      {isSearchActive && (
        <div className=' object-contain flex items-center bg-slate-800 rounded-lg overflow-hidden px-2 py-1 justify-end transition-all duration-300 ease-in-out shadow-lg'>
          {/* Your search input and button */}
        </div>
      )}
    </div>
  );
}

export default MY_Navbar2;
