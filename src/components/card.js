import React from 'react';
import './card.css'
const Card = ({ title, description, image, href_q, theme_mode }) => {
  return (
    <a href={"" + href_q} target="_blank" rel="noopener noreferrer" className='a-nodec'>

      <div className={`${theme_mode}`}>
        <div className={`card `}>
          <div className='img-cover'>
            <div className='overlay'>
              <p className='syp'>{description}</p>
            </div>
            <img src={image} alt={title} />
          </div>
          <div className="desc">
            <h2>{title}</h2>
            {/* <hr></hr> */}
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;

