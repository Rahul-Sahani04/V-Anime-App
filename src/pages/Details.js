import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import MY_Navbar2 from '../components/Navbar_2';
import Wavy from '../components/wavy_loader';

const AnimeDetails = ({ Anime_ID }) => {

    const location = useLocation();

    const [EpLoaded, setEpLoaded] = useState(false);
    const [Query, setQuery] = useState("");
    const [animeList, setAnimeList] = useState({});
    const [active, setActive] = useState("");

    const fetchInfo = async (query) => {
        try {
            const response = await fetch(`https://api.enime.moe/anime/${query}`);
            const data = await response.json();
            const animeList = data;
            setAnimeList(animeList);
            setEpLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    const isOnlyNumbers = (str) => {
        const numberPattern = /^\d+$/;
        return numberPattern.test(str);
    };


    useEffect(() => {
        const Query = Anime_ID || new URLSearchParams(location.search).get("id");
        setQuery(Query);
        fetchInfo(Query);

    }, []);

    return (
        <div>
            <MY_Navbar2 />
            <div className='w-full'>
                {!EpLoaded && (

                    <Wavy />
                )}
                {EpLoaded && (
                    <div className="w-full sm:flex md:flex lg:flex filter-none">
                        <div
                            style={{
                                backgroundImage: `url(${animeList.coverImage})`,
                                backgroundRepeat: 'no-repeat',
                            }}
                            className="w-[60dvw] h-[100dvh] object-fill col-span-2"
                        />
                        <div className="ml-10 mt-5 infos text-left col-span-1 w-full">
                            <h3 className="text-teal-100 text-lg">{animeList.title.romaji}</h3>
                            <h1 className="text-teal-100 text-4xl">{animeList.title.english}</h1>
                            <p className="text-left m-3">{animeList.format}</p>
                            <div className="w-full grid gap-4 grid-cols-1 m-3 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 ">

                                {/* <div className="rounded-lg overflow-hidden">
                                <img className="w-5/12" src={image} alt={title} />
                            </div> */}
                                <p
                                    className={`w-10/12 left-0 text-left ${animeList.description && animeList.description.length > 320 ? "h-[50dvh]" : ""}  overflow-y-auto md:text-clip ${active ? 'active' : ''
                                        }`}

                                    dangerouslySetInnerHTML={{ __html: animeList.description }} >
                                </p>
                                <p className="text-left">
                                    <b>Genres: </b>
                                    {animeList.genre.map((l) => l + " ") || "N/A"}
                                </p>
                                <p className="text-left">
                                    <b>Status: </b>
                                    {animeList.status}
                                </p>
                                <p className="text-left">
                                    <b>Total Episodes:</b> {animeList.episodes.length}
                                </p>
                                <Link to={{
                                    pathname: '/watch',
                                    search: `?query=${Query}`
                                }}>
                                    <button className=" ml-3 px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                        WATCH NOW
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimeDetails;
