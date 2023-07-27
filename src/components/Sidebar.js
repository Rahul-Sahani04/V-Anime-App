import React, { useState, useEffect, useRef } from 'react';
import Wavy from './wavy_loader';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [recomList, setRecomList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAnime = async (page_no) => {
        setIsLoading(true);
        const response = await fetch(`https://api.consumet.org/meta/anilist/popular?page=${page_no}`);
        const data = await response.json();
        setRecomList(data.results);
        setIsLoading(false);
    };


    useEffect(() => {
        fetchAnime(1);
    }, []);

    return (
        <div className="rounded-xl lg:flex flex-col bg-gray-900 text-white w-96">
            {isLoading ? <Wavy /> : (
                <>
                    <div className="p-4 ">
                        <p className="text-2xl font-bold items-center">Most Popular</p>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        <ul className="px-4 py-2 space-y-2">
                            {recomList.map((recom, index) => (
                                <div className='flex h-28 items-center' key={index}>
                                    <img src={recom.image} className='w-[60px] h-[80px] rounded-lg object-cover ' />
                                    <Link to={{

                                        pathname: '/details',
                                        search: `?id=${recom.id}`
                                    }}>
                                        <li className="m-4 h-full text-gray-300 hover:text-lime-500 cursor-pointer overflow-hidden" key={recom.id}>
                                            <p className='text-sm text-left overflow-hidden'>{recom.title.english ? recom.title.english : recom.title.userPreferred}</p>
                                        </li>
                                    </Link>
                                    <hr className='text-gray-300' />
                                </div>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
