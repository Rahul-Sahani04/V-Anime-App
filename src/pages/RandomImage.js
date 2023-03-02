import React, { useState, useEffect } from 'react';

function Random_image() {
    const list = ["waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry",
        "hug", "awoo", "kiss", "lick", "pat", "smug", "bonk", "yeet", "blush", "smile",
        "wave", "highfive", "handhold", "nom", "bite", "glomp", "slap", "kill", "kick",
        "happy", "wink", "poke", "dance", "cringe"]

    const [ImageUrl, SetImageUrl] = useState("");
    let imgarray = [];

    const fetchImage = async () => {
        for (let index = 0; index < 2; index++) {
            const response = await fetch(`https://api.waifu.pics/sfw/waifu`);
            const data = await response.json();
            console.log(data.url);
            SetImageUrl(data.url);
            imgarray[index] = data.url;
            console.log(`Url: ${ImageUrl} `);
        }
        console.log(`Array: ${imgarray} `);
    };

    useEffect(() => {
       fetchImage();
    }, []);
    return (
        <div className='app'>
            <input value={"Click Me"} type={'button'} onClick={() => fetchImage()}/>
            {
                imgarray?.map((anime_img, index) => (
                    <div>
                        <img src={anime_img} key={index} width="300px"/>
                    </div>
            )    )
            }
        </div>
    )
}

export default Random_image;