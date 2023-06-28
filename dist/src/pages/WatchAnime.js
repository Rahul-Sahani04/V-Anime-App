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
import MY_Navbar2 from '../components/Navbar_2';
import ThemeToggleButton from '../components/toggleTheme';
import './WatchAnime.css';
import { Link, useLocation } from 'react-router-dom';
import Wavy from '../components/wavy_loader';
import Episode_Button from '../components/button';
import { Next_Button, Prev_Button } from '../components/Next_Prev_Button';
import VideoPlayer from '../components/VideoPlayer';
function Watch() {
    var _this = this;
    var epi_no = "";
    var location = useLocation();
    var Videoqualities = [];
    var _a = useState("Naruto"), Query = _a[0], setQuery = _a[1];
    var _b = useState({}), animeList = _b[0], setAnimeList = _b[1];
    var _c = useState(""), WatchUrl = _c[0], setWatchUrl = _c[1];
    var _d = useState("Streamsb"), Server = _d[0], setServer = _d[1];
    var _e = useState([]), ServerList = _e[0], setServerList = _e[1];
    var _f = useState(1), TotalEP = _f[0], setTotalEP = _f[1];
    var _g = useState(1), EP = _g[0], setEP = _g[1];
    var _h = useState(""), DownloadLink = _h[0], setDownloadLink = _h[1];
    var _j = useState(false), isDarkMode = _j[0], setIsDarkMode = _j[1];
    var _k = useState(false), dataLoaded = _k[0], setDataLoaded = _k[1];
    var _l = useState(false), EpLoaded = _l[0], setEpLoaded = _l[1];
    var _m = useState(1), page = _m[0], setPage = _m[1];
    var episodesPerPage = 50;
    var startIndex = (page - 1) * episodesPerPage;
    var endIndex = startIndex + episodesPerPage;
    var handlePrevPage = function () {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    var handleNextPage = function () {
        var numPages = Math.ceil(animeList.episodes.length / episodesPerPage);
        if (page < numPages) {
            setPage(page + 1);
        }
    };
    var handleThemeToggle = function () {
        setIsDarkMode(!isDarkMode);
    };
    function handleChange(que) {
        setQuery(que);
    }
    var handleLinkClick = function (episodeId) {
        fetchAnime(episodeId);
    };
    var handleServerClick = function (episodeId, server) {
        console.log("EP ID & Server: " + episodeId + server);
        fetchAnime(episodeId, "", server);
    };
    var fetchEpisodes = function (query) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, animeList, TotalEP;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setEpLoaded(false);
                    return [4 /*yield*/, fetch("https://api.consumet.org/anime/gogoanime/info/".concat(query))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    animeList = data;
                    setAnimeList(animeList);
                    return [4 /*yield*/, animeList.totalEpisodes];
                case 3:
                    TotalEP = _a.sent();
                    setTotalEP(TotalEP);
                    // console.log(animeList);
                    // console.log("TITLE: " + animeList.title);
                    // console.log("Total Ep: " + TotalEP);
                    // console.log("Episode : " + animeList.episodes[0].id);
                    setEP(animeList.episodes[0].id);
                    setEpLoaded(true);
                    return [2 /*return*/];
            }
        });
    }); };
    var fetchDownloadLink = function (query_id) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, DownloadLink;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.consumet.org/anime/gogoanime/watch/".concat(query_id))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    DownloadLink = data.download;
                    setDownloadLink(DownloadLink);
                    return [2 /*return*/];
            }
        });
    }); };
    var fetchAnime = function (Que, Epi_No, Server) { return __awaiter(_this, void 0, void 0, function () {
        var syntext, server_data, servers, ServerList_1, response, ServerList_2, index, ele, WatchUrl_1, WatchUrl_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    syntext = Que + "-" + Epi_No;
                    // console.log("TEXT" + syntext);
                    setDataLoaded(false);
                    if (!Epi_No) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetch("https://api.consumet.org/anime/gogoanime/servers/".concat(syntext))];
                case 1:
                    servers = _a.sent();
                    return [4 /*yield*/, servers.json()];
                case 2:
                    server_data = _a.sent();
                    ServerList_1 = server_data;
                    setServerList(ServerList_1);
                    fetchDownloadLink(syntext);
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, fetch("https://api.consumet.org/anime/gogoanime/servers/".concat(Que))];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    server_data = _a.sent();
                    ServerList_2 = server_data;
                    setServerList(ServerList_2);
                    fetchDownloadLink(Que);
                    _a.label = 6;
                case 6:
                    for (index = 0; index < server_data.length; index++) {
                        ele = server_data[index];
                        if (ele.name == Server) {
                            WatchUrl_1 = server_data[index].url;
                            setWatchUrl(WatchUrl_1);
                            console.log("FOUND: " + ele.name + " " + Server);
                            break;
                        }
                        else {
                            WatchUrl_2 = server_data[0].url;
                            setWatchUrl(WatchUrl_2);
                            console.log(ele.name + " " + Server);
                        }
                    }
                    setDataLoaded(true);
                    return [2 /*return*/];
            }
        });
    }); };
    var fetchQuery = function (Que, Epi_No) { return __awaiter(_this, void 0, void 0, function () {
        var syntext, servers, server_data, WatchUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    syntext = Que + "-episode" + Epi_No;
                    setDataLoaded(false);
                    return [4 /*yield*/, fetch("https://api.consumet.org/anime/gogoanime/servers/".concat(syntext))];
                case 1:
                    servers = _a.sent();
                    return [4 /*yield*/, servers.json()];
                case 2:
                    server_data = _a.sent();
                    WatchUrl = server_data[2].url;
                    setWatchUrl(WatchUrl);
                    setDataLoaded(true);
                    return [2 /*return*/];
            }
        });
    }); };
    var fetchM3U8 = function (Que, Epi_No, ep_id) { return __awaiter(_this, void 0, void 0, function () {
        var syntext, servers, server_data, WatchUrl, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    syntext = "";
                    if (ep_id === "Y") {
                        syntext = Que + "-" + Epi_No;
                        // console.log("text; ", syntext);
                    }
                    else {
                        syntext = Que + "-episode" + Epi_No;
                        // console.log("text; ", syntext);
                    }
                    setDataLoaded(false);
                    return [4 /*yield*/, fetch("https://api.consumet.org/anime/gogoanime/watch/".concat(syntext))];
                case 1:
                    servers = _a.sent();
                    return [4 /*yield*/, servers.json()];
                case 2:
                    server_data = _a.sent();
                    console.log(server_data);
                    WatchUrl = server_data.sources[server_data.sources.length - 3].url;
                    for (index = 0; index < server_data.sources.length; index++) {
                        Videoqualities.push({ label: server_data.sources[index].quality, src: server_data.sources[index].url });
                    }
                    console.log("Qualities: ", Videoqualities);
                    // console.log("Quality 0: ", qualities[0].src);
                    console.log("M3U8: ", WatchUrl);
                    setWatchUrl(WatchUrl);
                    setDataLoaded(true);
                    return [2 /*return*/];
            }
        });
    }); };
    // const formattedQuery = Query.replace(/\s+/g, "-").toLowerCase(); 
    // console.log(formattedQuery); // "attack-on-titan"
    useEffect(function () {
        var Query = new URLSearchParams(location.search).get("query");
        var EP = new URLSearchParams(location.search).get("ep");
        var newQuery;
        var newEpID;
        if (!Query) {
            newQuery = Query;
            newEpID = EP.split("-episode")[1];
            newQuery = EP.split("-episode")[0];
            setQuery(newQuery);
            fetchEpisodes(newQuery);
            console.log("NEW ID: ", newQuery);
            console.log("NEW EP: ", newEpID);
        }
        else {
            setQuery(Query);
            fetchEpisodes(Query);
            console.log("ID ELSE: ", Query);
        }
        setEP(EP);
        console.log("ID: ", newQuery);
        if (EP && newQuery) {
            console.log("FETCH QUERY");
            fetchM3U8(newQuery, newEpID, "N");
        }
        else if (EP) {
            console.log("FETCH QUERY");
            fetchM3U8(Query, EP, "Y");
            fetchAnime(Query, EP);
        }
    }, []);
    // if (!dataLoaded) {
    //     return <Wavy />;
    // } else {
    return (React.createElement("div", { className: "app" },
        React.createElement(MY_Navbar2, null),
        React.createElement("div", null,
            React.createElement("h1", null,
                " ",
                animeList.title),
            React.createElement("div", { className: 'pagination' },
                React.createElement("button", { onClick: handlePrevPage },
                    React.createElement(Prev_Button, null)),
                React.createElement("span", null,
                    "Page ",
                    page,
                    " of ",
                    animeList.episodes ? Math.ceil(animeList.episodes.length / episodesPerPage) : 0),
                React.createElement("button", { onClick: handleNextPage },
                    React.createElement(Next_Button, null))),
            React.createElement("div", { className: 'main-content' },
                React.createElement("div", { className: 'content' },
                    animeList.episodes && animeList.episodes.slice(startIndex, endIndex).map(function (episode, index) { return (React.createElement("div", { className: 'episode', key: index },
                        React.createElement(Link, { className: 'link', 
                            // to={`/watch/${episode.id}`}
                            to: {
                                pathname: '/watch',
                                search: "?ep=".concat(episode.id)
                            }, onClick: function () { return handleLinkClick(episode.id); } },
                            React.createElement(Episode_Button, { epi_Id: parseInt(episode.id.split("-").pop()) })))); }),
                    !EpLoaded && (React.createElement(Wavy, null))),
                dataLoaded && (React.createElement("div", { className: 'video' },
                    React.createElement(VideoPlayer, { qualities: Videoqualities }),
                    React.createElement("div", { className: 'Download-Link' },
                        React.createElement("a", { href: DownloadLink, target: '_blank', className: 'buttonDownload' }, "Download")))),
                !dataLoaded && (React.createElement("div", { style: { width: '910px' } },
                    React.createElement(Wavy, null))),
                React.createElement("div", { className: 'desc' },
                    React.createElement("div", null,
                        React.createElement("img", { src: animeList.image, width: "200px", height: "200px" })),
                    React.createElement("p", null, animeList.description))))));
}
// }
export default Watch;
