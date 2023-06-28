import React, { useState, useEffect } from 'react';
import '../main.css';
import MY_Navbar2 from '../components/Navbar_2';
import ThemeToggleButton from '../components/toggleTheme';
import './WatchAnime.css';
import { Link, useLocation } from 'react-router-dom';
import Wavy from '../components/wavy_loader';
import Episode_Button from '../components/button';
import { Next_Button, Prev_Button } from '../components/Next_Prev_Button';

import PlyrComponent from '../components/VideoPlayer';

function Watch() {
    let epi_no = "";

    const location = useLocation()

    const [Query, setQuery] = useState("Naruto");
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
        const Query = new URLSearchParams(location.search).get("query");
        const EP = new URLSearchParams(location.search).get("ep");
        // fetchAnime(episodeId);
        fetchM3U8(Query, EP, "EP");
    };

    const handleServerClick = (episodeId, server) => {
        console.log("EP ID & Server: " + episodeId + server)
        fetchAnime(episodeId, "", server);
    };


    const fetchEpisodes = async (query) => {
        setEpLoaded(false);
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${query}`)
        const data = await response.json();
        const animeList = data;
        setAnimeList(animeList);
        const TotalEP = await animeList.totalEpisodes;
        setTotalEP(TotalEP);
        // console.log(animeList);
        // console.log("TITLE: " + animeList.title);
        // console.log("Total Ep: " + TotalEP);
        // console.log("Episode : " + animeList.episodes[0].id);
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
        // console.log("TEXT" + syntext);
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
                console.log("FOUND: " + ele.name + " " + Server)
                break;
            }
            else {
                const WatchUrl = server_data[0].url;
                setWatchUrl(WatchUrl);
                console.log(ele.name + " " + Server)

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
            // console.log("text; ", syntext);
        }else if (ep_id === "EP") {
            syntext = Epi_No;
        } else {
            syntext = Que + "-episode" + Epi_No;
            // console.log("text; ", syntext);
        }
        setDataLoaded(false);
        const servers = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${syntext}`)
        const server_data = await servers.json();
        console.log(server_data);
        const WatchUrl = server_data.sources[server_data.sources.length - 3].url;
        var templinks = [];
        for (let index = 0; index < server_data.sources.length; index++) {
            templinks.push(server_data.sources[index].url);   
        }
        const videoLink = templinks;
        setvideoLink(videoLink);
        console.log("M3U8: ", WatchUrl)
        console.log("M3U8: ", videoLink)
        setWatchUrl(WatchUrl);
        setDataLoaded(true);
    };




    // const formattedQuery = Query.replace(/\s+/g, "-").toLowerCase(); 
    // console.log(formattedQuery); // "attack-on-titan"


    useEffect(() => {
        const Query = new URLSearchParams(location.search).get("query");
        const EP = new URLSearchParams(location.search).get("ep");
        let newQuery;
        let newEpID;
        if (!Query) {
            newQuery = Query;
            newEpID = EP.split("-episode")[1];
            newQuery = EP.split("-episode")[0];
            setQuery(newQuery);
            fetchEpisodes(newQuery);
            console.log("NEW ID: ", newQuery);
            console.log("NEW EP: ", newEpID);
        } else {
            setQuery(Query);
            fetchEpisodes(Query);
            console.log("ID ELSE: ", Query);
        }

        setEP(EP);

        console.log("ID: ", newQuery);
        if (EP && newQuery) {
            console.log("FETCH QUERY");
            fetchM3U8(newQuery, newEpID, "N");
        }
        else if (EP) {
            console.log("FETCH QUERY");
            fetchM3U8(Query, EP, "Y");
            fetchAnime(Query, EP);
        }
    }, []);


    // if (!dataLoaded) {
    //     return <Wavy />;
    // } else {
    return (
        <div className={`app`}>
            <MY_Navbar2 />
            <div>

                <h1> {animeList.title}</h1>

                <div className='pagination'>
                    <button onClick={handlePrevPage}><Prev_Button /></button>

                    <span>
                        Page {page} of {animeList.episodes ? Math.ceil(animeList.episodes.length / episodesPerPage) : 0}
                    </span>

                    <button onClick={handleNextPage}><Next_Button /></button>
                </div>
                <div className='main-content'>
                    <div className='content' >

                        {animeList.episodes && animeList.episodes.slice(startIndex, endIndex).map((episode, index) => (
                            <div
                                className='episode'
                                key={index} >
                                <Link
                                    className='link'
                                    // to={`/watch/${episode.id}`}
                                    to={{

                                        pathname: '/watch',
                                        search: `?ep=${episode.id}`
                                    }}
                                    onClick={() => handleLinkClick(episode.id)}
                                >
                                    {/* {episode.id.split("-").pop()} */}
                                    <Episode_Button epi_Id={parseInt(episode.id.split("-").pop())} />
                                </Link>
                            </div>
                        ))}
                        {!EpLoaded && (
                            <Wavy />
                        )

                        }


                    </div>
                    {dataLoaded && (
                        <div className='video'>
                            {/* <iframe scrolling='no' frameBorder={0} title='Video-player' src={WatchUrl} width={"775px"} height={"423px"} allow="fullscreen" className='video-inside'></iframe> */}
                            <PlyrComponent QualityData={WatchUrl}/>
                            {/* <div className='servers'>
                                <h3>Server List: </h3>
                                <div className='server-list'>
                                    {ServerList && ServerList.map((Sname, index) => (
                                        <div key={index} onClick={() => handleServerClick(EP, Sname.name)}>
                                            /* {Sname.name} 
                                            <Episode_Button epi_Id={Sname.name} />
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                            <div className='Download-Link'>
                                <a href={DownloadLink} target={'_blank'} className={'buttonDownload'}>Download</a>
                            </div>
                        </div>
                    )}
                    {!dataLoaded && (
                        <div style={{ width: '910px' }}>
                            <Wavy />
                        </div>
                    )}
                    <div className='desc'>
                        <div>
                            <img src={animeList.image} width={"200px"} height={"200px"} />
                        </div>
                        <p >
                            {animeList.description}
                        </p>
                    </div>
                </div>
            </div>

        </div >
    );
}
// }

export default Watch;