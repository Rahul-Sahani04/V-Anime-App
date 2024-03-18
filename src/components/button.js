import React from 'react';
import './button.css';


function Episode_Button({ epi_num}) {
    const episodeId = epi_num;
    if (!isNaN(epi_num)) {
        return (
            // <button className="button-ep" data-before="Lets Watch" data-after={episodeId}></button>
            <button className={`button-ep button-ep-1 text-center`}>
                <p className={"font-bold"}>
                    {episodeId}
                </p>
            </button>

        );
    }

    else{
        return(
            <button className='button-ep button-ep-2'>
                {episodeId}
            </button>
        );
    }
}

export default Episode_Button;