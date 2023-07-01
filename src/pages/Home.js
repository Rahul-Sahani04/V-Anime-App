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
    const [Query_A, setQueryA] = useState('');

    const [showComponentA, setShowComponentA] = useState(true);

    const fromHome = true;
    const handleQueryChange = (event) => {
        setQueryA(event.target.value);
    };

    const onClickMe = () => {
        setShowComponentA(!showComponentA);
    };

    return (
        <div className={`app`}>
            <MY_Navbar2 theme={isDarkMode ? 'light-theme' : 'dark-theme'} />
            <div className=''>
                <AnimeCarousel />
            </div>
            <div className={isDarkMode ? 'app light-theme' : 'app dark-theme'}>
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
