import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Navbar2.css";


const Menu_Down = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
    </svg>
  )
}

const Menu_Up = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
    </svg>
  )
}

function MY_Navbar2(props) {
  // const theme = props.theme;
  const [Query, setQuery] = useState('');
  const [isSearchActive, setSearchActive] = useState(false);
  const [isToggleActive, setToggleActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const renderNew = (Query) => {
    navigate({ pathname: '/search', search: `?query=${Query}` });
    window.location.reload()
  }

  useEffect(() => {
    if (location.search !== undefined && location.search !== null) {
      setQuery(location.search.split('=')[1]);
    } else {
      setQuery("");
    }
  }, []);
  return (
    <div className='w-full ' >
      <nav className={`w-full flex py-6 justify-between items-center navbar `}>
        <Link className={`m-2 hover:text-lime-500  `} to="/home">
          <div className="logo"></div>
        </Link>
        <ul className="list-none sm:flex hidden justify-start items-center flex-1">

          <li className='font-mySans font-normal cursor-pointer text-[20px]'>
            <Link className={`transition-all duration-300 ease-in-out m-2 hover:text-lime-500  text-slate-200`} to="/home">Home</Link>
          </li>
          <li className='font-poppins font-normal cursor-pointer text-[20px]'>
            <Link className={`transition-all duration-300 ease-in-out m-2 hover:text-lime-500  text-slate-200`} to="/movie">Movie</Link>
          </li>
          <li className='font-poppins font-normal cursor-pointer text-[20px]'>
            <Link className={`transition-all duration-300 ease-in-out m-2 hover:text-lime-500  text-slate-200`} to="/top_anime">Top Anime</Link>
          </li>
          <li className='font-poppins font-normal cursor-pointer text-[20px]'>
            <Link className="transition-all duration-300 ease-in-out m-2 hover:text-lime-500 text-slate-200" to="/random_img">Random Image</Link>
          </li>
          <li className='font-poppins font-normal cursor-pointer text-[20px]'>
            <div className='justify-self-end hover:text-blue-500 transition-all duration-300 ease-in-out hover:scale-150 scale-200 m-4 text-slate-200 ' onClick={() => setSearchActive(!isSearchActive)} >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
              </svg>
            </div>

          </li>
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center z-50" onClick={() => setToggleActive(!isToggleActive)}>
          {isToggleActive ? <Menu_Down /> : <Menu_Up />}
          <div
          className={`${
            !isToggleActive ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
        <ul className="list-none flex justify-end items-start flex-1 flex-col">

        <li className='className={`font-poppins font-medium cursor-pointer text-[16px] "text-dimWhite" "mb-4"'>
            <Link className={`m-2 hover:text-lime-500  text-slate-200`} to="/home">Home</Link>
          </li>
          <li className='className={`font-poppins font-medium cursor-pointer text-[16px] "text-dimWhite" "mb-4"'>
            <Link className={`m-2 hover:text-lime-500  text-slate-200`} to="/movie">Movie</Link>
          </li>
          <li className='className={`font-poppins font-medium cursor-pointer text-[16px] "text-dimWhite" "mb-4"'>
            <Link className={`m-2 hover:text-lime-500  text-slate-200`} to="/top_anime">Top Anime</Link>
          </li>
          <li className='className={`font-poppins font-medium cursor-pointer text-[16px] "text-dimWhite" "mb-4"'>
            <Link className="m-2 hover:text-lime-500 text-slate-200" to="/random_img">Random Image</Link>
          </li>
          <li className='className={`font-poppins font-medium cursor-pointer text-[16px] "text-dimWhite" "mb-4"'>
            <div className='justify-self-end hover:text-blue-500 scale-200 m-4 text-slate-200 ' onClick={() => setSearchActive(!isSearchActive)} >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
              </svg>
            </div>

          </li>

        </ul>

          </div>
        </div>
      </nav>
      {/* <></> */}
      {isSearchActive && (
        <div className='w-screen object-contain flex items-center bg-slate-800 rounded-lg overflow-hidden px-2 py-1 justify-end transition-all duration-300 ease-in-out shadow-lg'>
          <input className='transition-all duration-500 ease-in-out indent-4  text-gray-200 text-lg flex-grow outline-none focus:caret-slate-900 border-4 border-slate-800 bg-slate-800 focus:border-lime-500 object-contain h-[55px] rounded-lg mr-2 ' value={Query ? Query.split('%20').join(' ') : ''} type='text' onChange={(e) => setQuery(e.target.value)} />
          <Link key={Query} to={{ pathname: '/search', search: `?query=${Query}` }}>
            {/* <input className='button-27 transition-colors duration-300 ease-in-out ' value={'Search'} type='Button ' onClick={() => renderNew(Query)} /> */}
            <button type="button" className="transition-all duration-300 ease-in-out text-white border bg-gray-900 hover:scale-125 hover:drop-shadow-xl focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={() => renderNew(Query)}>Search</button>
          </Link>
        </div>
      )}
    </div>
  );
}
export default MY_Navbar2;
