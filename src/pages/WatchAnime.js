import React, { useState, useEffect } from 'react';
import '../main.css';
import MY_Navbar2 from '../components/Navbar_2';
import ThemeToggleButton from '../components/toggleTheme';
import './WatchAnime.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Wavy from '../components/wavy_loader';
import Episode_Button from '../components/button';
import { Next_Button, Prev_Button } from '../components/Next_Prev_Button';

import PlyrComponent from '../components/VideoPlayer';

function Watch() {
    let epi_no = "";
    const navigate = useNavigate();
    const location = useLocation();

    const [IsMore, setIsMore] = useState(false);

    const [Query, setQuery] = useState("");
    const [animeList, setAnimeList] = useState({});
    const [WatchUrl, setWatchUrl] = useState("");

    const [Titles, setTitles] = useState([]);

    const [TotalEP, setTotalEP] = useState([]);
    const [EP, setEP] = useState(1);

    const [DownloadLink, setDownloadLink] = useState("");
    const [Description, setDescription] = useState("");

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [EpLoaded, setEpLoaded] = useState(false);

    const [page, setPage] = useState(1);
    const episodesPerPage = 28;
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

    const handleLinkClick = (episodeId) => {
        fetchM3U8(episodeId);
    };


    const fetchAnimeInfo = async (id) => {
        setDataLoaded(false);
        const response = await fetch(`https://api.enime.moe/anime/${id}`)  // Zoro
        const data = await response.json()
        const animeList = data;
        setAnimeList(animeList);
        if (typeof animeList.title === 'object') {
            const Titles = animeList.title["english"];
            setTitles(Titles);
        } else if (typeof animeList.title === 'array') {
            const Titles = animeList.title[0];
            setTitles(Titles);
        }
        else {
            const Titles = animeList.title;
            setTitles(Titles);
        }
        fetchM3U8(animeList.episodes[0].id);
        setTotalEP(animeList.episodes);
        setEpLoaded(true)
        setDescription(animeList.description);
        setDataLoaded(true);
    }
    const fetchM3U8 = async (id) => {
        const data = await fetch(`https://api.consumet.org/anime/enime/watch?episodeId=${id}`)  // Zoro
        const anime_link = await data.json();
        const WatchUrl = anime_link.sources[anime_link.sources.length - 1].url;
        setWatchUrl(WatchUrl);
    };

    useEffect(() => {
        const Query = new URLSearchParams(location.search).get("query");
        setQuery(Query);
        if (Query === undefined || Query === null || Query === "") {
            navigate("/home");
        }
        else {
            fetchAnimeInfo(Query);
        }
    }, []);



    return (
        <div className={`app`}>
            <MY_Navbar2 />
            <div>

                <h1 className='xl:text-2xl m-5'> {Titles}</h1>

                <div className='flex xl:justify-start lg:justify-start  justify-center items-center m-3 ml-5 w-full lg:w-2/6 xl:w-2/6'>
                    <button onClick={handlePrevPage} className='m-2'><Prev_Button /></button>

                    <span className='text-slate-100 m-2 '>
                        Page {page} of {animeList.episodes ? Math.ceil(animeList.episodes.length / episodesPerPage) : 0}
                    </span>

                    <button onClick={handleNextPage} className='m-2'><Next_Button /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-start transition-all duration-300 ease-in-out ">
                    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-10 lg:grid-cols-3 gap-y-4 m-4 lg:w-9/12 h-fit' >

                        {TotalEP && TotalEP.slice(startIndex, endIndex).map((episode, index) => (
                            <div
                                className='h-fit col-span-1'
                                key={index} >
                                <Link
                                    className='link'
                                    to={{

                                        pathname: '/watch',
                                        search: `?ep=${episode.id}`
                                    }}
                                    onClick={() => handleLinkClick(episode.id)}
                                >
                                    <Episode_Button epi_num={parseInt(episode.number)} />
                                </Link>
                            </div>
                        ))}
                        {!EpLoaded && (
                            <Wavy />
                        )

                        }


                    </div>
                    <div className='w-fit sm:w-fit md:w-fit lg:w-[500px] xl:w-[700px] xl:col-span-2 lg:col-span-1 col-span-1 object-contain justify-center'>
                        {dataLoaded && (
                            <>
                                <PlyrComponent QualityData={WatchUrl} />
                            </>
                        )}
                        {!dataLoaded && (
                            <div className='m-auto'>
                                <Wavy />
                            </div>
                        )}
                    </div>
                    <div className='w-fit xl:w-8/12 lg:w-6/12 justify-items-end bottom-0  xl:-right-20 lg:relative lg:-right-36'>
                        <div >
                            <img src={animeList.coverImage} className='' />
                        </div>
                        <p className={`w-fit text-left col-span-1 ${!IsMore ? "h-24" : "flex"} overflow-hidden  mt-2`}>
                            {Description}
                        </p>
                        {Description && Description.length >= 125 && (
                            <div className='cursor-pointer font-sans font-bold' onClick={() => { setIsMore(!IsMore) }}>
                                    {!IsMore ? "+ Show More" : "- Show Less"}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div >
    );
}
// }

export default Watch;