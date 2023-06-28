import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './main.css';
import './components/card.css';
// import MY_Navbar from './components/Navbar_2';
import "./components/Navbar.css";
function App() {
    var _a = useState(''), Query_A = _a[0], setQueryA = _a[1];
    return (React.createElement("div", { className: 'app' },
        React.createElement("div", { className: "content-image" },
            React.createElement("div", { className: "header-links" },
                React.createElement(Link, { className: "header-items", to: "/home" }, "Home"),
                React.createElement(Link, { className: "header-items", to: "/movie" }, "Movie"),
                React.createElement(Link, { className: "header-items", to: "/popular" }, "Popular"),
                React.createElement(Link, { className: "header-items", to: "/top_anime" }, "Top Anime")),
            React.createElement("div", { className: 'search1-box content-wrap' },
                React.createElement("input", { className: 'search-box', value: Query_A, type: "text", onChange: function (e) { return setQueryA(e.target.value); } }),
                React.createElement(Link, { className: "header-items", to: {
                        pathname: "/search",
                        search: "?query=".concat(Query_A),
                        state: { fromHome: true }
                    } },
                    React.createElement("input", { className: 'button-27', value: "Search", type: "Button" }))))));
}
export default App;
