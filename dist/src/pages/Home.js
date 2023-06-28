import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../main.css';
import ThemeToggleButton from '../components/toggleTheme';
import MY_Navbar2 from '../components/Navbar_2';
import Recom from './Recom';
import Search from './Search';
import Eyes from '../components/eyes';
function Home() {
    var _a = useState(false), isDarkMode = _a[0], setIsDarkMode = _a[1];
    var handleThemeToggle = function () {
        setIsDarkMode(!isDarkMode);
    };
    var _b = useState(''), Query_A = _b[0], setQueryA = _b[1];
    var _c = useState(true), showComponentA = _c[0], setShowComponentA = _c[1];
    var fromHome = true;
    var handleQueryChange = function (event) {
        setQueryA(event.target.value);
    };
    var onClickMe = function () {
        setShowComponentA(!showComponentA);
    };
    return (React.createElement("div", { className: "app" },
        React.createElement("div", { className: isDarkMode ? 'app light-theme' : 'app dark-theme' },
            React.createElement(MY_Navbar2, { theme: isDarkMode ? 'light-theme' : 'dark-theme' }),
            React.createElement("br", null),
            React.createElement("div", { className: 'search1-box content-wrap' },
                React.createElement("input", { className: 'search-box', value: Query_A, type: "text", onChange: handleQueryChange }),
                React.createElement(Link, { to: {
                        pathname: '/search',
                        search: "?query=".concat(Query_A),
                        state: { fromHome: true }
                    } },
                    React.createElement("input", { className: 'button-27', value: "Search", type: "Button", onClick: function () { return onClickMe(); } }))),
            React.createElement(Recom, null))));
}
export default Home;
