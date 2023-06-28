import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../main.css';
import './AnimeDetails.css';
import MY_Navbar2 from '../components/Navbar_2';
import { ContainerMain } from './DetailsStyle';
import Wavy from '../components/wavy_loader';
import { FaPlay } from "react-icons/fa";
import Episode_Button from '../components/button';

const AnimeDetails = () => {
    const location = useLocation()

    const [EpLoaded, setEpLoaded] = useState(false);
    const [Query, setQuery] = useState("");
    const [animeList, setAnimeList] = useState({});

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [TotalEP, setTotalEP] = useState("");
    const [OtherName, setOtherName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [genres, setGenres] = useState("");
    const [active, setActive] = useState("");
    // const [, set] = useState("");


    const fetchInfo = async (query) => {
        setEpLoaded(false);
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${query}`)
        const data = await response.json();
        const animeList = data;
        setAnimeList(animeList);
        console.log(animeList);
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
        const genres = animeList.genres.join(", ");
        setGenres(genres);
        setEpLoaded(true);
        // const TotalEP = await animeList.totalEpisodes;
        // setTotalEP(TotalEP);
        // setEP(animeList.episodes[0].id)
        // setEpLoaded(true);
    };

    useEffect(() => {
        const Query = new URLSearchParams(location.search).get("id");
        setQuery(Query);
        console.log("Query: ", Query);

        fetchInfo(Query);
    }, []);

    const ShowMoreDesc = (active) => {
        if (active == "") {
            const active = "active";
            setActive(active);
        } else {
            const active = "";
            setActive(active);
        }
    }
    return (

        <div>
            <MY_Navbar2 />
            <div className='space'></div>
            {!EpLoaded && (
                <Wavy />
            )}
            {EpLoaded && (
                <ContainerMain>
                    <div className='infos'>
                        <h3>{OtherName}</h3>

                        <h1>{title}</h1>
                        <p>{type}</p>

                        <p className={"description " + active}>{desc}</p>
                        <p onClick={ShowMoreDesc}>More +</p>
                        <p><b>Genres: </b>{genres}</p>
                        <p><b>Status: </b>{status}</p>
                        <p>Total Episodes: {TotalEP}</p>

                        <div className="btns">
                            <div className="">
                                <Link to={{
                                    pathname: '/watch',
                                    search: `?query=${Query}&ep=episode-1`
                                }}
                                    className={'main-card'}>
                                    <Episode_Button epi_Id={"Watch Now"} />
                                </Link>
                            </div>

                            {/* <div className="trailer">
                                <p>trailer</p>
                            </div> */}
                        </div>
                    </div>

                    <div className='image'>
                        <img src={image} alt='aki' />
                    </div>
                </ContainerMain>
            )}
        </div >

    );
};

export default AnimeDetails;
