import React from 'react';
import './button.css';
function Episode_Button(_a) {
    var epi_Id = _a.epi_Id;
    var episodeId = epi_Id;
    if (!isNaN(epi_Id)) {
        return (
        // <button className="button-ep" data-before="Lets Watch" data-after={episodeId}></button>
        React.createElement("button", { className: 'button-ep button-ep-1' }, episodeId));
    }
    else {
        return (React.createElement("button", { className: 'button-ep button-ep-2' }, episodeId));
    }
}
export default Episode_Button;
