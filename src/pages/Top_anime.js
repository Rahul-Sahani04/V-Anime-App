import React, { useState, useEffect, useRef } from 'react';
import '../main.css';
import Card_Component from '../components/card';
import MY_Navbar2 from '../components/Navbar_2';
import Wavy from '../components/wavy_loader';
import Sidebar from '../components/Sidebar';
function Top_Anime(props) {
    const [recomList, setRecomList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAnime = async (page_no) => {
        setIsLoading(true);
        const response = await fetch(`https://api.enime.moe/popular?page=${page_no}`);
        const data = await response.json();
        setRecomList((prev) => [...prev, ...data.data]);
        setIsLoading(false);
    };

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollHeight = document.body.scrollHeight;
        const scrollPosition = window.scrollY;

        if (scrollHeight - (scrollPosition + windowHeight) < 50 && !isLoading) {
            setIsLoading(true);
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        fetchAnime(page);
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


    // if (isLoading) {
    //     return <Wavy />
    // }
    // else {


    return (
        <div className='app'>
            <MY_Navbar2 />

            <div className='flex flex-grow lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-between'>
                {isLoading ? <Wavy /> : (
                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5" key={"D-ID"} >
                        {recomList.map((recom, index) => (
                            <div className='card-here' key={"ID" + index} >
                                <Card_Component className={'anime-card'} id={recom.slug} title={recom.title.english ? recom.title.english : recom.slug.split('-').join(" ")} image={recom.coverImage} SubOrDub={recom.subOrDub} />
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
    // }
}

export default Top_Anime;
