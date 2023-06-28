import React from 'react';
import './wavy_loader.css';
function Wavy() {
    return (React.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } },
        React.createElement("div", { class: "spinner" })));
}
export default Wavy;
