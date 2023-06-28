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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useRef } from 'react';
import '../main.css';
import Card_Component from '../components/card';
import MY_Navbar2 from '../components/Navbar_2';
import Wavy from '../components/wavy_loader';
function Movie(props) {
    var _this = this;
    var _a = useState([]), recomList = _a[0], setRecomList = _a[1];
    var _b = useState(true), HasNextPage = _b[0], setHasNextPage = _b[1];
    var _c = useState(1), page = _c[0], setPage = _c[1];
    var _d = useState(1), totalPages = _d[0], setTotalPages = _d[1];
    var _e = useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var fetchAnime = function (page_no) { return __awaiter(_this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    return [4 /*yield*/, fetch("https://api.consumet.org/anime/gogoanime/movie?page=".concat(page_no))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setHasNextPage(data.hasNextPage);
                    setRecomList(function (prev) { return __spreadArray(__spreadArray([], prev, true), data.results, true); });
                    // setTotalPages(data.totalPages);
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleScroll = function () {
        var windowHeight = window.innerHeight;
        var scrollHeight = document.body.scrollHeight;
        var scrollPosition = window.scrollY;
        if (scrollHeight - (scrollPosition + windowHeight) < 50 && !isLoading && HasNextPage) {
            setIsLoading(true);
            setPage(function (prev) { return prev + 1; });
        }
    };
    useEffect(function () {
        fetchAnime(1);
        window.addEventListener('scroll', handleScroll);
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(function () {
        if (page > 1) {
            fetchAnime(page);
        }
    }, [page]);
    return (React.createElement("div", { className: 'app' },
        React.createElement(MY_Navbar2, null),
        React.createElement("div", { className: 'container', key: "D-ID" }, recomList.map(function (recom, index) { return (React.createElement("div", { className: 'card-here', key: "ID" + index },
            React.createElement(Card_Component, { theme_mode: props.theme, className: 'anime-card', id: recom.id, title: recom.title, image: recom.image }))); })),
        isLoading && (React.createElement(Wavy, null))));
}
export default Movie;
