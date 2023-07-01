import React from 'react';
import { Link } from 'react-router-dom';
import './card.css'
const Card = ({ title, otherTitle, id, total_Ep, image, href_q, theme_mode }) => {

  return (
    <div className="transition-all duration-300 ease-in-out card-container hover:scale-105 ">
      <div className="wrapper">
        <img src={image} className="banner-image object-fill" />
        {
          title ? <h4 className='font-semibold font-sans text-base overflow-hidden h-16'>{title}</h4> : <h4 className='font-semibold font-sans text-base overflow-hidden'>{otherTitle}</h4>
        }

      </div>
      <p className='font-sans '>
        {total_Ep}
      </p>
      <div className="button-wrapper">
        <Link to={{

          pathname: '/details',
          search: `?id=${id}`
        }}
          className={'main-card'}>
          <button className="btn outline">DETAILS</button>
        </Link>

        <Link to={{

          pathname: '/watch',
          search: `?query=${id}&ep=episode-1`
        }}
          className={'main-card'}>
          <button className="btn fill">Watch Now</button>
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