import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";

function MY_Navbar2(props) {
  const theme  = props.theme;
  return (
    <div className={`content`}>
    <div className={`header-links `}>
      <Link className={`header-items` } to="/home">Home</Link>
      <Link className={`header-items` } to="/movie">Movie</Link>
      <Link className={`header-items` } to="/popular">Popular</Link>
      <Link className={`header-items` } to="/top_anime">Top Anime</Link>
      <Link className="header-items" to="/watch">Watch Here</Link>
      <Link className="header-items" to="/random_img">Random Image</Link>
    </div>
    </div>
  );
}
export default MY_Navbar2;







// import React from 'react';
// import './Navbar.css';

// const Navbar = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <a href="#">Home</a>
//         </li>
//         <li>
//           <a href="#">Movies</a>
//         </li>
//         <li>
//           <a href="#">TV Series</a>
//         </li>
//         <li>
//           <a href="#">Most Popular</a>
//         </li>
//         <li>
//           <a href="#">Top Airing</a>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
