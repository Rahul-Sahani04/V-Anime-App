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
    const [videoLink, setvideoLink] = useState([]);

    const [Server, setServer] = useState("Streamsb");
    const [ServerList, setServerList] = useState([]);

    const [TotalEP, setTotalEP] = useState(1);
    const [EP, setEP] = useState(1);

    const [DownloadLink, setDownloadLink] = useState("");

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

    function handleChange(que) {
        setQuery(que);
    }

    const handleLinkClick = (episodeId) => {
        const Query = new URLSearchParams(location.search).get("query");
        const EP = new URLSearchParams(location.search).get("ep");
        // fetchAnime(episodeId);
        fetchM3U8(Query, episodeId, "EP");
    };

    // const handleServerClick = (episodeId, server) => {
    //     // console.log("EP ID & Server: " + episodeId + server)
    // fetchAnime(episodeId, "", server);
    // };


    const fetchEpisodes = async (query) => {
        setEpLoaded(false);
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${query}`)
        const data = await response.json();
        const animeList = data;
        setAnimeList(animeList);
        const TotalEP = await animeList.totalEpisodes;
        setTotalEP(TotalEP);
        // // console.log(animeList);
        // // console.log("TITLE: " + animeList.title);
        // // console.log("Total Ep: " + TotalEP);
        // // console.log("Episode : " + animeList.episodes[0].id);
        setEP(animeList.episodes[0].id)
        setEpLoaded(true);
    };


    const fetchDownloadLink = async (query_id) => {
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${query_id}`)
        const data = await response.json();
        const DownloadLink = data.download;
        setDownloadLink(DownloadLink);
    };

    const fetchAnime = async (Que, Epi_No, Server) => {
        let syntext = Que + "-" + Epi_No;
        // // console.log("TEXT" + syntext);
        setDataLoaded(false);
        let server_data;

        if (Epi_No) {
            const servers = await fetch(`https://api.consumet.org/anime/gogoanime/servers/${syntext}`)
            server_data = await servers.json();

            const ServerList = server_data;
            setServerList(ServerList);
            fetchDownloadLink(syntext);

        } else {
            const response = await fetch(`https://api.consumet.org/anime/gogoanime/servers/${Que}`)
            server_data = await response.json();


            const ServerList = server_data;
            setServerList(ServerList);
            fetchDownloadLink(Que);
        }

        for (let index = 0; index < server_data.length; index++) {
            let ele = server_data[index];
            if (ele.name == Server) {
                const WatchUrl = server_data[index].url;
                setWatchUrl(WatchUrl);
                // // console.log("FOUND: " + ele.name + " " + Server)
                break;
            }
            else {
                const WatchUrl = server_data[0].url;
                setWatchUrl(WatchUrl);
                // console.log(ele.name + " " + Server)

            }

        }

        setDataLoaded(true);
    };

    const fetchQuery = async (Que, Epi_No) => {
        let syntext = Que + "-episode" + Epi_No;
        setDataLoaded(false);
        const servers = await fetch(`https://api.consumet.org/anime/gogoanime/servers/${syntext}`)
        const server_data = await servers.json();
        const WatchUrl = server_data[2].url;
        setWatchUrl(WatchUrl);
        setDataLoaded(true);
    };

    const fetchM3U8 = async (Que, Epi_No, ep_id) => {
        let syntext = ""
        if (ep_id === "Y") {
            syntext = Que + "-" + Epi_No;
            // // console.log("text; ", syntext);
        } else if (ep_id === "EP") {
            syntext = Epi_No;
        } else {
            syntext = Que + "-episode" + Epi_No;
            // // console.log("text; ", syntext);
        }
        setDataLoaded(false);
        const servers = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${syntext}`)
        const server_data = await servers.json();
        // console.log(server_data);
        const WatchUrl = server_data.sources[server_data.sources.length - 3].url;
        var templinks = [];
        for (let index = 0; index < server_data.sources.length; index++) {
            templinks.push(server_data.sources[index].url);
        }
        const videoLink = templinks;
        setvideoLink(videoLink);
        // console.log("M3U8: ", WatchUrl)
        // console.log("M3U8: ", videoLink)
        setWatchUrl(WatchUrl);
        setDataLoaded(true);
    };

    useEffect(() => {
        const Query = new URLSearchParams(location.search).get("query");
        const EP = new URLSearchParams(location.search).get("ep");
        if (Query === undefined || Query === null || Query === "") {
            navigate("/home");
        }
        if (EP === undefined || EP === null || EP === "") {
            navigate(`/watch?query=${Query}&ep=episode-1`);
        }
        let newQuery;
        let newEpID;
        if (!Query) {
            newQuery = Query;
            newEpID = EP.split("-episode")[1];
            newQuery = EP.split("-episode")[0];
            setQuery(newQuery);
            fetchEpisodes(newQuery);
        } else {
            setQuery(Query);
            fetchEpisodes(Query);
        }
        setEP(EP);
        
        if (EP && newQuery) {
            fetchM3U8(newQuery, newEpID, "N");
        }
        else if (EP) {
            fetchM3U8(Query, EP, "Y");
        }
    }, []);


    // if (!dataLoaded) {
    //     return <Wavy />;
    // } else {
    return (
        <div className={`app`}>
            <MY_Navbar2 />
            <div>

                <h1 className='xl:text-2xl m-5'> {animeList.title}</h1>

                <div className='flex justify-start items-center m-3'>
                    <button onClick={handlePrevPage} className='m-2'><Prev_Button /></button>

                    <span className='text-slate-100 m-2'>
                        Page {page} of {animeList.episodes ? Math.ceil(animeList.episodes.length / episodesPerPage) : 0}
                    </span>

                    <button onClick={handleNextPage} className='m-2'><Next_Button /></button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid xl:grid-cols-4 gap-2 justify-start transition-all duration-300 ease-in-out '>
                    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-10 lg:grid-cols-3 gap-y-4 m-4 lg:w-9/12 h-fit' >

                        {animeList.episodes && animeList.episodes.slice(startIndex, endIndex).map((episode, index) => (
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
                                    <Episode_Button epi_Id={parseInt(episode.id.split("-").pop())} />
                                </Link>
                            </div>
                        ))}
                        {!EpLoaded && (
                            <Wavy />
                        )

                        }


                    </div>
                    <div className=' sm:w-[250px] w-[400px] md:w-[800px] lg:w-[700px] xl:w-[700px] col-span-2 object-contain justify-center'>
                        {dataLoaded && (
                            <>
                                <PlyrComponent QualityData={WatchUrl} />
                                <div className='Download-Link'>
                                    {/* <a href={DownloadLink} target={'_blank'} className={''}>Download</a> */}
                                    <button type="button" className="transition-all duration-300 ease-in- text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => navigate(DownloadLink)}>Download</button>
                                </div>
                            </>
                        )}
                        {!dataLoaded && (
                            <div className=''>
                                <Wavy />
                            </div>
                        )}
                    </div>
                    <div className='justify-items-end'>
                        <div>
                            <img src={animeList.image} className='w-6/12' />
                        </div>
                        <p className={`text-left col-span-1 ${!IsMore ? "xl:h-24 " : "flex"} overflow-hidden  mt-2`}>
                            {animeList.description}
                        </p>
                        <div className='cursor-pointer font-sans font-extrabold' onClick={() => { setIsMore(!IsMore) }}>
                            + More
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}
// }

export default Watch;