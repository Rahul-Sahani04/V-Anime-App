import React from 'react';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import './toggle.css'

function ThemeToggleButton(props) {
  const { isDarkMode, onToggle } = props;

  return (
    <div>
      <input type="checkbox" className="checkbox" id="checkbox" checked={isDarkMode} onChange={onToggle} />
      <label htmlFor="checkbox" className="label">
        <BsMoonStarsFill />
        <BsFillSunFill />
        <div className="ball"></div>
      </label>
    </div>
  );
}

export default ThemeToggleButton;
