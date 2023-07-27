import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import MY_Navbar2 from '../components/Navbar_2';
import Wavy from '../components/wavy_loader';

import Card_Component from '../components/card';
import Custom_Footer from '../components/footer';

const AnimeDetails = ({ Anime_ID }) => {

    const location = useLocation();

    const [EpLoaded, setEpLoaded] = useState(false);
    const [Query, setQuery] = useState("");
    const [animeList, setAnimeList] = useState({});
    const [active, setActive] = useState("");

    const fetchInfo = async (query) => {
        try {
            const response = await fetch(`https://api.consumet.org/meta/anilist/info/${query}`);
            const data = await response.json();
            const animeList = data;
            setAnimeList(animeList);
            setEpLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchRandom = async () => {
        try {
            const response = await fetch(`https://api.consumet.org/meta/anilist/random-anime`, {
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });
            const data = await response.json();
            if (data.message === "Anime not found") {
                fetchRandom();
            }
            setAnimeList(data);
            setEpLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };


    const isOnlyNumbers = (str) => {
        const numberPattern = /^\d+$/;
        return numberPattern.test(str);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const Query = Anime_ID || new URLSearchParams(location.search).get("id");
        if (Query) {
            setQuery(Query);
            fetchInfo(Query);
        } else {
            navigate('/home');
        }
    }, [Anime_ID, location]);


    return (
        <div>
            <MY_Navbar2 />
            <div className='w-full'>
                {!EpLoaded && (

                    <Wavy />
                )}
                {EpLoaded && (
                    <div className="w-full sm:flex md:flex lg:flex filter-none m-4">
                        <div
                            style={{
                                backgroundImage: `url(${animeList.image})`,
                                backgroundRepeat: 'no-repeat',
                            }}
                            className="w-[60dvw] h-[100dvh] object-fill col-span-2"
                        />
                        <div className="m-0 lg:m-10 xl:ml-10 mt-5 infos text-left col-span-1 w-full">
                            {animeList.title && (
                                <div>
                                    <h3 className="text-teal-100 text-lg">
                                        {animeList.title.romaji ?? ""}
                                    </h3>
                                    <h1 className="text-teal-100 text-4xl">
                                        {animeList.title.english ?? ""}
                                    </h1>
                                </div>
                            )}

                            <p className="text-left m-3">{animeList.format}</p>
                            <div className="w-full grid gap-4 grid-cols-1 m-3 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 ">

                                {/* <div className="rounded-lg overflow-hidden">
                                <img className="w-5/12" src={image} alt={title} />
                            </div> */}
                                <p
                                    className={`w-10/12 left-0 text-left ${animeList.description && animeList.description.length > 320 ? "h-fit" : ""}  overflow-y-auto md:text-clip ${active ? 'active' : ''
                                        }`}

                                    dangerouslySetInnerHTML={{ __html: animeList.description }} >
                                </p>
                                {animeList.trailer && (

                                    <p className="text-left">
                                        <b>Trailer: </b>
                                        <a href={`https://www.youtube.com/watch?v=${animeList.trailer.id}`} >Watch Here</a>
                                    </p>
                                )}
                                <p className="text-left">
                                    <b>Genres: </b>
                                    {animeList.genres.map((l) => l + " ") || "N/A"}
                                </p>
                                <p className="text-left">
                                    <b>Status: </b>
                                    {animeList.status}
                                </p>
                                <p className="text-left">
                                    <b>Sub Or Dub: </b>
                                    {animeList.subOrDub}
                                </p>
                                <p className="text-left">
                                    <b>Total Episodes:</b> {animeList.totalEpisodes}
                                </p>
                                {animeList.totalEpisodes !== animeList.currentEpisode && (
                                    <p className="text-left">
                                        <b>Current Episodes:</b> {animeList.currentEpisode}
                                    </p>
                                )}
                                <Link to={{
                                    pathname: '/watch',
                                    search: `?query=${animeList.id}`
                                }}>
                                    <button className="ml-3 px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                        WATCH NOW
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    {animeList.recommendations && (

                        <div className='m-4'>
                            <div>
                                <h2 className='text-teal-100 text-2xl p-4'>More Like This: </h2>
                            </div>
                            {EpLoaded ? (
                                <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" key={"D-ID"} >
                                    {animeList.recommendations?.map((anime, index) => (
                                        <div key={index}>
                                            <Card_Component className='anime-card' title={anime.title.english ? anime.title.english : anime.title.userPreferred} id={anime.id} image={anime.image} />
                                        </div>
                                    )
                                    )}
                                </div>
                            ) : (
                                <Wavy />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Custom_Footer />
        </div>
    );
};

export default AnimeDetails;
