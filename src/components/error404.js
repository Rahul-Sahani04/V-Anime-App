import React from 'react';
import './error404.css';

function Error404() {

    return (
        <div className='main-container'>
            <div className="error">404</div>
            <br /><br />
            <span className="info">File not found</span>
            {/* <img src="https://media3.giphy.com/media/l41K3o5TzvmhZwd4A/giphy.gif?cid=ecf05e47yyy0w5r59rsri4vz9z4bt15uvrzn4t9ldaoplmig&ep=v1_gifs_search&rid=giphy.gif&ct=g" className="static" /> */}
        </div>
    );
}


export default Error404;