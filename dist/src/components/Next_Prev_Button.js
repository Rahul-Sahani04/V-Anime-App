import React from 'react';
import './Next_Prev_Button.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
function Next_Button(_a) {
    return (React.createElement("button", { className: 'button-br' },
        React.createElement(FaArrowRight, { className: '.arrow-icon' }),
        React.createElement("span", null, "Next")));
}
function Prev_Button(_a) {
    return (React.createElement("button", { className: 'button-br' },
        React.createElement(FaArrowLeft, { className: '.arrow-icon' }),
        React.createElement("span", null, "Prev")));
}
export { Next_Button, Prev_Button };
