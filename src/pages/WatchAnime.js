import React, { useState, useEffect } from 'react';
import '../main.css';
import MY_Navbar2 from '../components/Navbar_2';
import ThemeToggleButton from '../components/toggleTheme';
import './WatchAnime.css';
import { Link } from 'react-router-dom';

const ItemPerPage = 25;

function Watch() {
    const [Query, setQuery] = useState("Naruto");
    const [animeList, setAnimeList] = useState({});
    const [WatchUrl, setWatchUrl] = useState("");

    const [TotalEP, setTotalEP] = useState(1);
    const Ep_no = window.location.pathname.split('/')[2];

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    function handleChange(que) {
        setQuery(que);
    }

    const handleLinkClick = (episodeId) => {
        fetchAnime(episodeId);
    };


    const fetchEpisodes = async (query) => {
        const response = await fetch(`https://gogoanime.consumet.stream/anime-details/${query}`)
        const data = await response.json();
        const animeList = data;
        setAnimeList(animeList);
        const TotalEP = await animeList.totalEpisodes;
        setTotalEP(TotalEP);
        console.log(animeList);
        console.log("TITLE: " + animeList.animeTitle);
        console.log("Total Ep: " + TotalEP);
        console.log("Episode : " + animeList.episodesList[0].episodeId);
        setDataLoaded(true);
    };
    const fetchAnime = async (Epi_No) => {
        const response = await fetch(`https://gogoanime.consumet.stream/vidcdn/watch/${Epi_No}`)
        const data = await response.json();
        const WatchUrl = data.Referer;
        setWatchUrl(WatchUrl);
        console.log(WatchUrl);

        setDataLoaded(true);
    };

    useEffect(() => {
        const formattedQuery = query.replace(/\s+/g, "-").toLowerCase(); 
        console.log(formattedQuery); // "attack-on-titan"

        if (Ep_no) {
            console.log(Ep_no);
            fetchAnime(Ep_no);
        }
        fetchEpisodes(Query);
    }, []);

    if (!dataLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={`app`}>
                <h1> {animeList.animeTitle}</h1>
                <input type={"text"} onChange={e => handleChange(e.target.value)} />
                <input type={"submit"} onClick={() => fetchEpisodes(Query)} />
                <div className='main-content'>

                    <div className='content' >
                        {animeList.episodesList.slice(0).reverse().map((episode, index) => (
                            <div className='episode' key={index} >
                                <Link
                                    className='link'
                                    to={`/watch/${episode.episodeId}`}
                                    onClick={() => handleLinkClick(episode.episodeId)}
                                >
                                    {episode.episodeId.split("-")[2]}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className='video'>
                        <iframe src={WatchUrl} width={"1080px"} height={"600px"}></iframe>
                    </div>
                </div>


            </div>
        );
    }
}

export default Watch;
