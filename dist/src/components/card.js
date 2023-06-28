import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';
var Card = function (_a) {
    var title = _a.title, id = _a.id, description = _a.description, image = _a.image, href_q = _a.href_q, theme_mode = _a.theme_mode;
    function busy() {
        alert("This button is not working at the moment ;)");
    }
    return (React.createElement("div", { className: "card-container" },
        React.createElement("div", { className: "wrapper" },
            React.createElement("img", { src: image, className: "banner-image" }),
            React.createElement("h4", { className: 'title' }, title)),
        React.createElement("div", { className: "button-wrapper" },
            React.createElement("button", { className: "btn outline", onClick: busy }, "DETAILS"),
            React.createElement(Link, { to: {
                    pathname: '/watch',
                    search: "?query=".concat(id, "&ep=episode-1")
                }, className: 'main-card' },
                React.createElement("button", { className: "btn fill" }, "Watch Now")))));
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
