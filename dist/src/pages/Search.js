var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect } from 'react';
import '../main.css';
import Card_Component from '../components/card';
import MY_Navbar2 from '../components/Navbar_2';
import ThemeToggleButton from '../components/toggleTheme';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Wavy from '../components/wavy_loader';
var Search = function (_a) {
    var query_y = _a.query_y;
    var _b = useState(""), Query = _b[0], setQuery = _b[1];
    var temp = "";
    var _c = useState(1), page = _c[0], setPage = _c[1];
    var _d = useState([]), animeList = _d[0], setAnimeList = _d[1];
    var _e = useState(1), totalPages = _e[0], setTotalPages = _e[1];
    var _f = useState(1), Totalitems = _f[0], setTotalItems = _f[1];
    var _g = useState(false), dataLoaded = _g[0], setDataLoaded = _g[1];
    var _h = useState(false), isDarkMode = _h[0], setIsDarkMode = _h[1];
    var handleThemeToggle = function () {
        setIsDarkMode(!isDarkMode);
    };
    var location = useLocation();
    var Navigate = useNavigate();
    var fetchLocation = function () { return __awaiter(void 0, void 0, void 0, function () {
        var temp, fromHome;
        var _a, _b;
        return __generator(this, function (_c) {
            temp = location.search.split("=");
            setQuery(temp[1]);
            if (((_a = location.state) === null || _a === void 0 ? void 0 : _a.fromHome) == true) {
                setQuery(location.search.split("="));
                console.log("QQQ " + Query);
            }
            fromHome = (_b = location.state) === null || _b === void 0 ? void 0 : _b.fromHome;
            console.log(fromHome);
            return [2 /*return*/];
        });
    }); };
    var fetchAnime = function (query, page) { return __awaiter(void 0, void 0, void 0, function () {
        var formattedQuery, response, data, Query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setDataLoaded(false);
                    formattedQuery = query.replace(/\s+/g, "%20").toLowerCase();
                    console.log(formattedQuery); // "attack-on-titan"
                    return [4 /*yield*/, fetch("https://api.consumet.org/anime/gogoanime/".concat(formattedQuery, "?page=").concat(page))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    // console.log(data);
                    setAnimeList(data.results);
                    setQuery(temp);
                    Query = query;
                    setQuery(Query);
                    setDataLoaded(true);
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        console.log("Welcome to Search " + location.search);
        if (location.search != undefined && location.search != null && location.search.split("=")[1] != "") {
            temp = location.search.split("=")[1];
            console.log("My temp: ", temp);
            fetchAnime(temp, page);
        }
        else {
            // console.log("EMpty");
            Navigate("/home");
        }
    }, []);
    return (React.createElement("div", { className: "app" },
        React.createElement("div", { className: isDarkMode ? 'app light-theme' : 'app dark-theme' },
            React.createElement(MY_Navbar2, null),
            React.createElement("div", { className: 'search1-box content-wrap' },
                React.createElement("input", { className: 'search-box', value: Query, type: "text", onChange: function (e) { return setQuery(e.target.value); } }),
                React.createElement(Link, { to: {
                        pathname: '/search',
                        search: "?query=".concat(Query)
                    } },
                    React.createElement("input", { className: 'button-27', value: "Search", type: "Button", onClick: function () { return fetchAnime(Query, 1); } }))),
            dataLoaded && (React.createElement("div", { className: 'container', key: "D-ID" }, animeList === null || animeList === void 0 ? void 0 : animeList.map(function (anime, index) { return (React.createElement(Card_Component, { className: 'anime-card', title: anime.title, id: anime.id, description: "", image: anime.image, key: index })); }))),
            !dataLoaded && (React.createElement(Wavy, null)))));
    // }
};
export default Search;
