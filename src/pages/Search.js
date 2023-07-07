import React, { useState, useEffect } from 'react';
import ReactHover, { Trigger, Hover } from 'react-hover';
import '../main.css';
import Card_Component from '../components/card';
import MY_Navbar2 from '../components/Navbar_2';
import ThemeToggleButton from '../components/toggleTheme';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Wavy from '../components/wavy_loader';
import AnimeDetails from './Details';
import Sidebar from '../components/Sidebar';

const Search = ({ query_y }) => {
    const [Query, setQuery] = useState('');

    let temp = '';
    const [page, setPage] = useState(1);
    const [animeList, setAnimeList] = useState([]);
    const [totalEpisodes, setTotalEpisodes] = useState(0);

    const [dataLoaded, setDataLoaded] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(false);

    const fetchAnime = async (query, page) => {
        setDataLoaded(false)
        let formattedQuery = query.replace(/\s+/g, '%20').toLowerCase();
        const response = await fetch(`https://api.consumet.org/anime/enime/${formattedQuery}?page=${page}`);
        const data = await response.json();
        const animeList = data.results;
        
        setAnimeList(animeList);
        setQuery(temp);
        const Query = query;
        setQuery(Query);
        setDataLoaded(true);
    };
    const fetchTotalEpisodes = async (query) => {
        setDataLoaded(false)
        const response = await fetch(`https://api.consumet.org/anime/enime/info?id=${query}`);
        const data = await response.json();
        const totalEpisodes = data.totalEpisodes;
        setTotalEpisodes(totalEpisodes)
        return totalEpisodes;
    };

    useEffect(() => {
        if (location.search !== undefined && location.search !== null && location.search.split('=')[1] !== '' && location.search.split('=')[1] !== 'undefined') {
            temp = location.search.split('=')[1];
            fetchAnime(temp, page);
        } else {
            navigate('/home');
        }
    }, []);

    return (
        <div className={` app ${isDarkMode ? 'light-theme' : 'dark-theme'} z-10`}>
            <MY_Navbar2 />
            <div className='flex flex-grow lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-between'>

                {dataLoaded ? (
                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5" key={"D-ID"} >
                        {animeList?.map((anime, index) => (
                            <div key={index}>
                                <Card_Component className='anime-card' title={anime.title} id={anime.id} SubOrDub={anime.type} image={anime.image} />
                            </div>
                        )
                        )}
                    </div>
                ) : (
                    <Wavy />
                )}
                <div className=' justify-end right-0 hidden lg:block xl:block laptop:w-1/2'>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default Search;
