import React from 'react';
import './Next_Prev_Button.css';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Next_Button({ }) {
    return (
        <button className='button-br'>
            <FaArrowRight className='.arrow-icon'/>
            <span>Next</span>
        </button>
    );
}

function Prev_Button({ }) {
    return (
        <button className='button-br'>
            <FaArrowLeft className='.arrow-icon'/>
            <span>Prev</span>
        </button>
    );
}

export { Next_Button, Prev_Button };