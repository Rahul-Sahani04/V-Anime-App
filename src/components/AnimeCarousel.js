import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AnimeCarousel = ({ slideInterval = 5000 }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [recomList, setRecomList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchAnime = async (page_no) => {
        setIsLoading(true);
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/top-airing?page=${page_no}`);
        const data = await response.json();
        setRecomList(data.results);
        setIsLoading(false);
        setIsLoaded(true);
    };

    useEffect(() => {
        fetchAnime(1);
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
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100dvw',
            height: '75dvh',
            aspectRatio: 16 / 9,
        };
        return styles;
    }

    return (
        <div className="relative h-[600px] mt-10 xl:mt-0">
            <div className="relative rounded-lg place-items-start w-full " >
                {recomList.map((slide, index) => (
                    <div
                        style={ImageBackground(slide.image)}
                        key={index}
                        className={`xl:mt-10  absolute w-full h-full transform transition-transform duration-500 ${index === currentSlide ? 'opacity-100 translate-x-0' : 'hidden -translate-x-full'
                            }`

                        }
                    >
                        {/* <img src={slide.image} alt={slide.title} className="w-1/6 h-auto object-cover" /> */}
                        <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50">
                            <h2 className="text-xl font-semibold text-white ">{slide.title}</h2>
                            <p className="text-gray-300 text-left">{slide.genres.join(", ")}</p>
                            <div className="mt-4">
                                <Link to={{
                                    pathname: '/details',
                                    search: `?id=${slide.id}`
                                }}>
                                    <button className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">
                                        DETAILS
                                    </button>
                                </Link>
                                <Link to={{
                                pathname: '/watch',
                                search: `?query=${slide.id}`
                                }}>
                                    <button  className=" ml-3 px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                        WATCH NOW
                                    </button>
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
                        className={` z-40 w-4 h-4 mx-1 rounded-full focus:outline-none ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>

            <button
                className="md:m-5 absolute top-1/2 left-0 z-10 px-4 py-2 text-white bg-black bg-opacity-50 rounded-full transform -translate-y-1/2 focus:outline-none"
                onClick={goToPrevSlide}
            >
                Prev
            </button>

            <button
                className="md:m-5 absolute top-1/2 right-0 z-10 px-4 py-2 text-white bg-black bg-opacity-50 rounded-full transform -translate-y-1/2 focus:outline-none"
                onClick={goToNextSlide}
            >
                Next
            </button>
        </div>
    );
};

export default AnimeCarousel;
