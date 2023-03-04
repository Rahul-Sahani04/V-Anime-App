import React, { useState, useEffect, useRef } from 'react';
import '../main.css';
import Card_Component from '../components/card';
import MY_Navbar2 from '../components/Navbar_2';

function Movie(props) {
    const [recomList, setRecomList] = useState([]);
    const [HasNextPage, setHasNextPage] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAnime = async (page_no) => {
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/movie?page=${page_no}`);
        const data = await response.json();
        setHasNextPage(data.hasNextPage);
        setRecomList((prev) => [...prev, ...data.results]);
        // setTotalPages(data.totalPages);
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
            <div className='container' key={"D-ID"} >
                {recomList.map((recom, index) => (
                    <div className='card-here' key={"ID" + index} >
                        <Card_Component theme_mode={props.theme} className={'anime-card'} id={recom.id} title={recom.title} image={recom.image} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Movie;
