import React, { useState, useEffect } from 'react';
import './image.css';
import '../main.css';
import MY_Navbar2 from '../components/Navbar_2';
import Wavy from '../components/wavy_loader';

function Random_image() {
    const list = ["waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry",
        "hug", "awoo", "kiss", "lick", "pat", "smug", "bonk", "yeet", "blush", "smile",
        "wave", "highfive", "handhold", "nom", "bite", "glomp", "slap", "kill", "kick",
        "happy", "wink", "poke", "dance", "cringe"];
    const [images, setImages] = useState("");
    const [isLoading, setLoading] = useState(false);

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
            <MY_Navbar2 />
            <div className='butt'>
                <input value={"Generate More"} type={'button'} onClick={() => fetchImages()} className="btn fill" />
            </div>
            {!isLoading && (
                    <div className='w-full flex r-image'>
                        <img className='align-middle content-center' key={randomNumber} src={images} />
                    </div>
                )
            }
            {isLoading && (
                <Wavy />
            )}
        </div>
    )
    // }
}

export default Random_image;