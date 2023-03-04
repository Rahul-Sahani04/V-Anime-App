import React, { useState, useEffect } from 'react';
import './image.css';
import '../main.css';
import MY_Navbar2 from '../components/Navbar_2';

function Random_image() {
    const list = ["waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry",
        "hug", "awoo", "kiss", "lick", "pat", "smug", "bonk", "yeet", "blush", "smile",
        "wave", "highfive", "handhold", "nom", "bite", "glomp", "slap", "kill", "kick",
        "happy", "wink", "poke", "dance", "cringe"];
    const [images, setImages] = useState("");
    const [loading, setLoading] = useState(false);

    const randomNumber = Math.floor(Math.random() * list.length);
    const fetchImages = async () => {
        setLoading(true);
        const response = await fetch(`https://api.waifu.pics/sfw/${list[randomNumber]}`);
        const data = await response.json();
        setImages(data.url);
        setLoading(false);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className='app'>
            <MY_Navbar2 className={"navbar"} />
            <div className='butt'>
                <input value={"Generate More"} type={'button'} onClick={() => fetchImages()} className="btn fill" />
            </div>
            <div className='container r-image'>
                <img key={randomNumber} src={images} />
            </div>
            {loading && <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
                <div className="wheel"></div>
                <div className="hamster">
                    <div className="hamster__body">
                        <div className="hamster__head">
                            <div className="hamster__ear"></div>
                            <div className="hamster__eye"></div>
                            <div className="hamster__nose"></div>
                        </div>
                        <div className="hamster__limb hamster__limb--fr"></div>
                        <div className="hamster__limb hamster__limb--fl"></div>
                        <div className="hamster__limb hamster__limb--br"></div>
                        <div className="hamster__limb hamster__limb--bl"></div>
                        <div className="hamster__tail"></div>
                    </div>
                </div>
                <div className="spoke"></div>

            </div>}
        </div>
    )
}

export default Random_image;