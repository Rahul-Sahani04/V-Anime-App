import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../main.css';
import ThemeToggleButton from '../components/toggleTheme';
import MY_Navbar2 from '../components/Navbar_2';
import Recom from './Recom';
import Search from './Search';

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
            <div className={isDarkMode ? 'app light-theme' : 'app dark-theme'}>
                <MY_Navbar2 theme={isDarkMode ? 'light-theme' : 'dark-theme'}/>
                <div className='toggle'>
                    <ThemeToggleButton isDarkMode={isDarkMode} onToggle={handleThemeToggle} />
                </div>

                <br />
                <div className='search1-box content-wrap'>

                    <input className='search-box' value={Query_A} type={"text"} onChange={handleQueryChange} />
                    <Link to={{
                        pathname: '/search',
                        search: `?query=${Query_A}`,
                        state: { fromHome: true }
                    }}>
                        <input className='button-27' value={"Search"} type={"Button"} onClick={() => onClickMe()} />
                    </Link>

                </div>
                <Recom />
                {/* {showComponentA ? <Recom key={129} /> : <Search query_y={Query_A} showComponentA={showComponentA} key={169} />} */}
            </div>
        </div>
    );
}

export default Home;
