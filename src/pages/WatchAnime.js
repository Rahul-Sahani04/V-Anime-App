import React, { useState, useEffect } from 'react';
import '../main.css';
import MY_Navbar2 from '../components/Navbar_2';
import ThemeToggleButton from '../components/toggleTheme';
import './WatchAnime.css';
import { Link, useLocation } from 'react-router-dom';


function Watch() {
    const location = useLocation()

    const [Query, setQuery] = useState("Naruto");
    const [animeList, setAnimeList] = useState({});
    const [WatchUrl, setWatchUrl] = useState("");

    const [TotalEP, setTotalEP] = useState(1);
    const [EP, setEP] = useState(1);

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [page, setPage] = useState(1);
    const episodesPerPage = 50;
    const startIndex = (page - 1) * episodesPerPage;
    const endIndex = startIndex + episodesPerPage;

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        const numPages = Math.ceil(animeList.episodes.length / episodesPerPage);
        if (page < numPages) {
            setPage(page + 1);
        }
    };


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
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${query}`)
        const data = await response.json();
        const animeList = data;
        setAnimeList(animeList);
        const TotalEP = await animeList.totalEpisodes;
        setTotalEP(TotalEP);
        console.log(animeList);
        console.log("TITLE: " + animeList.title);
        console.log("Total Ep: " + TotalEP);
        console.log("Episode : " + animeList.episodes[0].id);
        setEP(animeList.episodes[0].id)
    };

    const fetchAnime = async (Que, Epi_No) => {
        let syntext = Que + "-" + Epi_No;
        console.log("TEXT" + syntext);
        if (Epi_No) {
            const servers = await fetch(`https://api.consumet.org/anime/gogoanime/servers/${syntext}`)
            const server_data = await servers.json();
            console.log("servers: ");
            console.log(server_data);
            const WatchUrl = server_data[2].url;
            setWatchUrl(WatchUrl);
            // setDataLoaded(true);
        } else {
            const response = await fetch(`https://api.consumet.org/anime/gogoanime/servers/${Que}`)
            const server_data = await response.json();
            const WatchUrl = server_data[2].url;
            setWatchUrl(WatchUrl);
            console.log(WatchUrl);
        }
        setDataLoaded(true);
    };




    // const formattedQuery = Query.replace(/\s+/g, "-").toLowerCase(); 
    // console.log(formattedQuery); // "attack-on-titan"


    useEffect(() => {
        const Query = new URLSearchParams(location.search).get("query");
        const EP = new URLSearchParams(location.search).get("ep");

        setQuery(Query);
        setEP(EP);

        fetchEpisodes(Query);
        if (EP) {
            console.log("C EP: " + EP);
            fetchAnime(Query, EP);
        }
        console.log(animeList);
    }, []);

    if (!dataLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={`app`}>
                <h1> {animeList.title}</h1>
                <input type={"text"} onChange={e => handleChange(e.target.value)} />
                <input type={"submit"} onClick={() => fetchEpisodes(Query)} />
                <div className='pagination'>
                    <button onClick={handlePrevPage}>Prev</button>
                    
                    <span>
                        Page {page} of {animeList.episodes ? Math.ceil(animeList.episodes.length / episodesPerPage) : 0}
                    </span>

                    <button onClick={handleNextPage}>Next</button>
                </div>
                <div className='main-content'>
                    <div className='content' >

                        {animeList.episodes && animeList.episodes.slice(startIndex, endIndex).map((episode, index) => (
                            <div className='episode' key={index} >
                                <Link
                                    className='link'
                                    // to={`/watch/${episode.id}`}
                                    to={{

                                        pathname: '/watch',
                                        search: `?ep=${episode.id}`
                                    }}
                                    onClick={() => handleLinkClick(episode.id)}
                                >
                                    {episode.id.split("-").pop()}
                                </Link>
                            </div>
                        ))}


                    </div>
                    <div className='video'>
                        <iframe src={WatchUrl} width={"1080px"} height={"600px"}></iframe>
                    </div>
                </div>


            </div >
        );
    }
}

export default Watch;
