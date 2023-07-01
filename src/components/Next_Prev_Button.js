import React from 'react';
import './Next_Prev_Button.css';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Next_Button({ }) {
    return (
        <button className='button-br text-slate-800'>
            <span>Next</span>
            <FaArrowRight className='.arrow-icon'/>
        </button>
    );
}

function Prev_Button({ }) {
    return (
        <button className='button-br text-slate-800'>
            <FaArrowLeft className='.arrow-icon'/>
            <span>Prev</span>
        </button>
    );
}

export { Next_Button, Prev_Button };