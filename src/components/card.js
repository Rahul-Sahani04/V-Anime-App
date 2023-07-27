import React from 'react';
import { Link } from 'react-router-dom';
import './card.css'
const Card = ({ title, otherTitle, id, SubOrDub, image, href_q, theme_mode }) => {

  return (
    <div className="transition-all duration-300 ease-in-out card-container hover:scale-105">
      <div className="wrapper">
        <div
          style={{
            backgroundImage: `url(${image})`
          }}
          className="banner-image object-fill"
        >
        </div>
        {
          title ? <h4 className='m-2 font-semibold font-sans text-base overflow-hidden h-14'>{title}</h4> : <h4 className='font-semibold font-sans text-base overflow-hidden'>{otherTitle}</h4>
        }

        {SubOrDub ? "" :
          <p className='mr-5 font-sans relative flex'>
            {SubOrDub}
          </p>
        }
      </div>
      <div className="button-wrapper justify-between">
        <Link to={{

          pathname: '/details',
          search: `?id=${id}`
        }}
          className={'main-card'}>
          <button className="btn outline mr-1 hover:z-30">DETAILS</button>
        </Link>

        <Link to={{

          pathname: '/watch',
          search: `?query=${id}`
        }}
          className={'main-card'}>
          <button className="btn fill ml-1 hover:z-30">Watch Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
