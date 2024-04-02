import React, { useState, useEffect, useRef } from 'react';
import '../main.css';
import Card_Component from '../components/card';
import MY_Navbar2 from '../components/Navbar_2';
import Wavy from '../components/wavy_loader';
import Sidebar from '../components/Sidebar';

function Movie(props) {
    const [recomList, setRecomList] = useState([]);
    const [HasNextPage, setHasNextPage] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAnime = async (page_no) => {
        setIsLoading(true);
        const response = await fetch(`${API_ENDPOINT}/anime/gogoanime/movie?page=${page_no}`);
        const data = await response.json();
        setHasNextPage(data.hasNextPage);
        setRecomList((prev) => [...prev, ...data.results]);
        setIsLoading(false);
    };

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollHeight = document.body.scrollHeight;
        const scrollPosition = window.scrollY;

        if (scrollHeight - (scrollPosition + windowHeight) < 50 && !isLoading && HasNextPage) {
            setIsLoading(true);
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        fetchAnime(1);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (page > 1) {
            fetchAnime(page);
        }
    }, [page]);




    return (
        <div className='app'>
            <MY_Navbar2 />

            <div className='flex flex-grow lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-between'>
                {isLoading ? <Wavy /> : (
                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5" key={"D-ID"} >
                        {recomList.map((recom, index) => (
                            <div className='card-here flex justify-center' key={"ID" + index} >
                                <Card_Component theme_mode={props.theme} className={'anime-card'} id={recom.id} title={recom.title} image={recom.image} SubOrDub={recom.subOrDub} />
                            </div>
                        ))}
                    </div>
                )}
                <div className=' justify-end right-0 hidden lg:block xl:block laptop:w-1/2'>
                    <Sidebar />
                </div>
            </div>

        </div>
    );

}

export default Movie;
