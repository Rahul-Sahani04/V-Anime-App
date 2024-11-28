import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchBar = ({search, setSearch}) => {
  const navigate = useNavigate();

    const onHandleEnter = (e) => {
        if(e.keyCode === 13 || e.key === 'Enter') {
            navigate(`/search?query=${search}`);
        } 
    }

  return (
    <StyledWrapper>
      <div className="searchBar__container">
        <input type="text" name="text" className="searchBar__input" required placeholder="Type to search..." value={search} onChange={(e) => setSearch(e.target.value)}  onKeyDown={onHandleEnter}/>
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <title>Search</title>
            <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={32} />
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={32} d="M338.29 338.29L448 448" />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .searchBar__container {
    --size-button: 40px;
    position: relative;
    color: white;
  }

  .searchBar__input {
    padding-left: var(--size-button);
    height: var(--size-button);
    font-size: 15px;
    border: none;
    color: #fff;
    outline: none;
    width: var(--size-button);
    transition: all ease 0.3s;
    background-color: #191A1E;
    box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
    border-radius: 50px;
    cursor: pointer;
  }

  .searchBar__input:focus,
  .searchBar__input:not(:invalid) {
    width: 30vw;
    cursor: text;
    box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 1.5px 1.5px 3px #0e0e0e, inset -1.5px -1.5px 3px #5f5e5e;
  }

  .searchBar__input:focus + .icon,
  .searchBar__input:not(:invalid) + .icon {
    pointer-events: all;
    cursor: pointer;
  }

  .searchBar__container .icon {
    position: absolute;
    width: var(--size-button);
    height: var(--size-button);
    top: 0;
    left: 0;
    padding: 8px;
    pointer-events: none;
  }

  .searchBar__container .icon svg {
    width: 100%;
    height: 100%;
  }`;

export default SearchBar;
