import React from 'react';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import './toggle.css';
function ThemeToggleButton(props) {
    var isDarkMode = props.isDarkMode, onToggle = props.onToggle;
    return (React.createElement("div", null,
        React.createElement("input", { type: "checkbox", className: "checkbox", id: "checkbox", checked: isDarkMode, onChange: onToggle }),
        React.createElement("label", { htmlFor: "checkbox", className: "label" },
            React.createElement(BsMoonStarsFill, null),
            React.createElement(BsFillSunFill, null),
            React.createElement("div", { className: "ball" }))));
}
export default ThemeToggleButton;
