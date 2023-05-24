import React from 'react';
import './button.css';


function Episode_Button({ epi_Id }) {
    const episodeId = epi_Id;
    return (
        // <button class="button-ep" data-before="Lets Watch" data-after={episodeId}></button>
        <button className='button-ep'>
            {episodeId}
        </button>

    );
}

export default Episode_Button;