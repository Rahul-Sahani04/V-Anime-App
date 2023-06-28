import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";
function MY_Navbar() {
    return (React.createElement("div", { className: "content-image" },
        React.createElement("div", { className: "header-links" },
            React.createElement(Link, { className: "header-items", to: "/home" }, "Home"),
            React.createElement(Link, { className: "header-items", to: "/movie" }, "Movie"),
            React.createElement(Link, { className: "header-items", to: "/popular" }, "Popular"),
            React.createElement(Link, { className: "header-items", to: "/top_anime" }, "Top Anime"),
            React.createElement(Link, { className: "header-items", to: "/watch" }, "Watch Here"),
            React.createElement(Link, { className: "header-items", to: "/random_img" }, "Random Image"))));
}
export default MY_Navbar;
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
