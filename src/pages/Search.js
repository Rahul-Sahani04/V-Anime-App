import React, { useState, useEffect } from 'react';
import '../main.css';
import Card_Component from '../components/card';
import MY_Navbar2 from '../components/Navbar_2';
import ThemeToggleButton from '../components/toggleTheme';
import { Link, useLocation } from 'react-router-dom';
const ItemPerPage = 5;

const Search = ({ query_y }) => {
    const [Query, setQuery] = useState("One Piece");
    let temp = "";
    const [page, setPage] = useState(1);
    const [animeList, setAnimeList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [Totalitems, setTotalItems] = useState(1);

    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };


    const location = useLocation();
    const fetchLocation = async () => {
        const temp = location.search.split("=");
        setQuery(temp[1]);
        if (location.state?.fromHome == true) {
            setQuery(location.search.split("="));
            console.log("QQQ " + Query);
        }
        const fromHome = location.state?.fromHome;
        console.log(fromHome);

    }

    const fetchAnime = async (query, page) => {
        let formattedQuery = query.replace(/\s+/g, "%20").toLowerCase(); 
        console.log(formattedQuery); // "attack-on-titan"
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/${formattedQuery}?page=${page}`);
        const data = await response.json();
        console.log(data);
        setAnimeList(data.results);
        setQuery(temp);
        const Query = "";
        setQuery(Query);
    };

    useEffect(() => {
        console.log("Welcome to Search " + location.search);
        if (location.search != undefined || location.search != null) {
            temp = location.search.split("=")[1];
            fetchAnime(temp, page);
        }
        else {
            fetchAnime(Query, page);
        }
    }, []);
    return (
        <div className={`app`}>
            <div className={isDarkMode ? 'app light-theme' : 'app dark-theme'}>
                <MY_Navbar2 />
                <div className='toggle'>
                    <ThemeToggleButton isDarkMode={isDarkMode} onToggle={handleThemeToggle} />
                </div>
                <div className='search1-box content-wrap'>

                    <input className='search-box' value={Query} type={"text"} onChange={e => setQuery(e.target.value)} />
                    <Link to={{
                        pathname: '/search',
                        search: `?query=${Query}`
                    }} >
                        <input className='button-27' value={"Search"} type={"Button"} onClick={() => fetchAnime(Query, 1)} />
                    </Link>

                </div>
                <div className='container' key={"D-ID"}>
                    {
                        animeList?.map((anime, index) => (
                            // <Link to={`/watch/${anime.id}-episode-1`} className={'main-card'}>
                                <Card_Component className={'anime-card'} title={anime.title} id={anime.id} description={""} image={anime.image} key={index} />
                            // </Link>
                        )
                        )}
                </div>

            </div>
        </div >
    )

}
export default Search;