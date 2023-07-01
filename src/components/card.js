import React from 'react';
import { Link } from 'react-router-dom';
import './card.css'
const Card = ({ title, otherTitle, id, SubOrDub, image, href_q, theme_mode }) => {

  return (
    <div className="transition-all duration-300 ease-in-out card-container hover:scale-105 ">
      <div className="wrapper">
        <img src={image} className="banner-image object-fill" />
        {
          title ? <h4 className='m-2 font-semibold font-sans text-base overflow-hidden h-6'>{title}</h4> : <h4 className='font-semibold font-sans text-base overflow-hidden'>{otherTitle}</h4>
        }

      <p className='mr-5 font-sans relative flex'>
        {SubOrDub}
      </p>
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
          search: `?query=${id}&ep=episode-1`
        }}
          className={'main-card'}>
          <button className="btn fill ml-1 hover:z-30">Watch Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;




  // <a href={"" + href_q} target="_blank" rel="noopener noreferrer" className='a-nodec'>

  //   <div className={`${theme_mode}`}>
  //     <div className={`card `}>
  //       <div className='img-cover'>
  //         <div className='overlay'>
  //           <p className='syp'>{description}</p>
  //         </div>
  //         <img src={image} alt={title} />
  //       </div>
  //       <div className="desc">
  //         <h2>{title}</h2>
  //         {/* <hr></hr> */}
  //       </div>
  //     </div>
  //   </div>
  // </a>