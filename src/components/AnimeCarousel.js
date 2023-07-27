import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const AnimeCarousel = ({ slideInterval = 7500 }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [recomList, setRecomList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [Anime_ID, setAnimeId] = useState("");

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setIsLoaded(false);
            const response = await axios.get(`https://api.consumet.org/meta/anilist/popular?page=1&perPage=10`);
            const data = response.data.results;
            const recomList = data;
            setRecomList(recomList);
            setIsLoading(false);
            setIsLoaded(true);
        } catch (error) {
            console.error('Error fetching anime data:', error);
            return false;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === recomList.length - 1 ? 0 : prevSlide + 1));
        console.log(currentSlide)
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? recomList.length - 1 : prevSlide - 1));
        console.log(currentSlide)
    };
    useEffect(() => {
        if (isLoaded) {

            const timer = setInterval(goToNextSlide, slideInterval);
            return () => clearInterval(timer);
        }
    }, [currentSlide, slideInterval, isLoaded, recomList.length]);


    const ImageBackground = (imageUrl) => {
        const styles = {
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
            backgroundSize: '33.3% 100%',
            backdropFilter: 'blur(5px)',
            width: '98dvw',
            height: '75dvh',
        };
        return styles;
    }




    return (
        <div className="relative min-h-screen h-screen w-screen mt-10 xl:mt-0 ">
            <div className="relative rounded-lg place-items-start w-screen transition-all duration-500 ease-in-out">

                {recomList.map((anime, index) => (
                    <div
                        style={ImageBackground(anime.image)}
                        key={index}
                        className={`xl:mt-10 absolute w-full h-full transition-all duration-500 transform  ${index === currentSlide ? 'opacity-100 translate-x-0' : 'hidden -translate-x-full'}`
                        }>
                        {/* <img src={slide.image} alt={slide.title} className="w-1/6 h-auto object-cover" /> */}
                        <div className="absolute bottom-0 w-2/3 h-full p-4 bg-black bg-opacity-60">
                            <div className='h-[5dvh] overflow-hidden'>
                                <p className="text-2xl text-white font-extrabold text-left ml-5 ">{anime.title.english ? anime.title.english : anime.slug.split("-").join(" ")}</p>
                            </div>
                            <div className='ml-10 -mt-5'>
                                <p className='text-gray-300 text-left font-bold m-4 '>
                                    {anime.title_english} <br />
                                    {/* Studios: <a className='hover:text-lime-500' href={anime.url} target='_blank' rel="noreferrer">{anime.studios[0].name}</a> */}
                                </p>
                                <p className="text-gray-300 text-left m-4"> {anime.format}<br />{anime.genres.map((l) => l + " ")}</p>
                                <p className='text-gray-300 text-left font-bold m-4'>
                                    <b>Status:</b> {anime.status} <br />
                                    <b>Episodes:</b> {anime.totalEpisodes} <br />
                                    <b>Duration:</b> {anime.duration} <br />
                                    {/* <b>Popularity:</b> {anime.popularity} */}
                                </p>
                                <div className='h-[25dvh] overflow-y-auto'>
                                    <p className='text-gray-300 text-left font-bold m-4' dangerouslySetInnerHTML={{ __html: anime.description }} key={anime.id} />
                                </div>
                            </div>
                            <div className="absolute m-5 object-center justify-items-center bottom-5">
                                <Link to={{
                                    pathname: '/details',
                                    search: `?id=${anime.id}`
                                }}>
                                    {/* <button className="self-center px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">
                                        DETAILS
                                    </button> */}
                                    <button className="btn outline ml-5 hover:z-30">Details</button>
                                </Link>
                                <Link to={{
                                    pathname: '/watch',
                                    search: `?query=${anime.id}`
                                }}>
                                    {/* <button className="self-center ml-3 px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                        WATCH NOW
                                    </button> */}
                                    <button className="btn fill ml-5 hover:z-30">Watch Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-2 absolute -top-10 xl:top-0 w-full">
                {recomList.map((_, index) => (
                    <button
                        key={index}
                        className={`z-40 w-4 h-4 mx-1 rounded-full focus:outline-none transition-all duration-300 ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
                        onClick={() => setCurrentSlide(index)}
                    />

                ))}
            </div>
            <div className='h-screen '>
                <button
                    className="absolute top-1/3 align-middle left-0 z-10 px-4 py-2 text-white bg-black bg-opacity-50 rounded-md focus:outline-none transition-all duration-300"
                    onClick={goToPrevSlide}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>

                </button>

                <button
                    className="absolute top-1/3 align-middle right-[11px] z-10 px-4 py-2 text-white bg-black bg-opacity-50 rounded-md focus:outline-none transition-all duration-300"
                    onClick={goToNextSlide}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>

                </button>
            </div>
        </div>
    );
};

export default AnimeCarousel;
