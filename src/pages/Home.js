import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../main.css';
import ThemeToggleButton from '../components/toggleTheme';
import MY_Navbar2 from '../components/Navbar_2';
import Recom from './Recom';
import AnimeCarousel from '../components/AnimeCarousel';

function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`app`}>
            <MY_Navbar2 />
            <div className=''>
                <AnimeCarousel />
            </div>
            <div className={""}>
                <p className='text-xl text-left mt-10 ml-6 font-bold'>Recently Released</p>
                {/* <div className='toggle'>
                    <ThemeToggleButton isDarkMode={isDarkMode} onToggle={handleThemeToggle} />
                </div> */}

                <br />
                <Recom />
            </div>
        </div>
    );
}

export default Home;
