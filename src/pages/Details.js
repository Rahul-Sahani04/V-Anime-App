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

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [TotalEP, setTotalEP] = useState("");
    const [OtherName, setOtherName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [genres, setGenres] = useState("");

    const fetchInfo = async (query) => {
        setEpLoaded(false);
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${query}`);
        const data = await response.json();
        const animeList = data;
        setAnimeList(animeList);
        const image = animeList.image;
        setImage(image);

        const title = animeList.title;
        setTitle(title);
        const desc = animeList.description;
        setDesc(desc);
        const totalEps = animeList.totalEpisodes;
        setTotalEP(totalEps);
        const otherName = animeList.otherName;
        setOtherName(otherName);
        const status = animeList.status;
        setStatus(status);
        const type = animeList.type;
        setType(type);
        if (animeList.genres) {
            const genres = animeList.genres.join(", ");
            setGenres(genres);
        } else {
            setGenres("N/A")
        }
        setEpLoaded(true);
    };

    useEffect(() => {
        const Query = Anime_ID || new URLSearchParams(location.search).get("id");
        setQuery(Query);
        fetchInfo(Query);
    }, []);

    const handleMouseEnter = () => {
        setActive(true);
    };

    const handleMouseLeave = () => {
        setActive(false);
    };

    return (
        <div>
            <MY_Navbar2 />
            <div className="w-10/12 m-5">
                {!EpLoaded && (

                    <Wavy />
                )}
                {EpLoaded && (
                    <div className="sm:flex md:flex lg:flex  xl:flex">
                        <div className="infos text-left">
                            <h3 className="text-teal-100 text-lg">{OtherName}</h3>
                            <h1 className="text-teal-100 text-4xl">{title}</h1>
                            <p className="text-left m-3">{type}</p>
                            <div className="grid gap-4 grid-cols-1 m-3 md:grid-cols-1 lg:grid-cols-1">

                                {/* <div className="rounded-lg overflow-hidden">
                                <img className="w-5/12" src={image} alt={title} />
                            </div> */}
                                <p
                                    className={`w-8/12 text-left overflow-hidden md:text-clip ${active ? 'active' : ''
                                        }`}
                                >
                                    {desc}
                                </p>
                                <p className="text-left">
                                    <b>Genres: </b>
                                    {genres || "N/A"}
                                </p>
                                <p className="text-left">
                                    <b>Status: </b>
                                    {status}
                                </p>
                                <p className="text-left">
                                    <b>Total Episodes:</b> {TotalEP}
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
                        <div className='object-contain w-[550px] sm:w-[500px] md:w-[750px] lg:w-[800px] xl:w-[1200px] '>
                            <img src={image} className='rounded-lg drop-shadow-lg' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimeDetails;
