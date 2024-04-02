import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";
import { Card, CardHeader } from "@nextui-org/react";

const Card_Component = ({ title, SubOrDub, type, year, id, image,  onMouseOver, onMouseOut, index}) => {

  return (
    <Card
      className="relative col-span-12 sm:col-span-4 h-[300px] w-8/12 bg-transparent my-card-container"
      onMouseOver={() => onMouseOver(index)} // Track the hovered card index
      onMouseOut={() => onMouseOut(null)}
    >
      <Link
        to={{
          pathname: "/details",
          search: `?id=${id}`,
        }}
        className={"main-card"}
      >
        <div className="w-full h-3/4 absolute flex justify-center items-center z-10 bg-transparent backdrop-blur-sm opacity-0 hover:opacity-80 hover:text-2xl transition-all delay-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000"
            height="30px"
            width="30px"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 58.752 58.752"
            xmlSpace="preserve"
          >
            <g>
              <path d="M52.524,23.925L12.507,0.824c-1.907-1.1-4.376-1.097-6.276,0C4.293,1.94,3.088,4.025,3.088,6.264v46.205   c0,2.24,1.204,4.325,3.131,5.435c0.953,0.555,2.042,0.848,3.149,0.848c1.104,0,2.192-0.292,3.141-0.843l40.017-23.103   c1.936-1.119,3.138-3.203,3.138-5.439C55.663,27.134,54.462,25.05,52.524,23.925z M49.524,29.612L9.504,52.716   c-0.082,0.047-0.18,0.052-0.279-0.005c-0.084-0.049-0.137-0.142-0.137-0.242V6.263c0-0.1,0.052-0.192,0.14-0.243   c0.042-0.025,0.09-0.038,0.139-0.038c0.051,0,0.099,0.013,0.142,0.038l40.01,23.098c0.089,0.052,0.145,0.147,0.145,0.249   C49.663,29.47,49.611,29.561,49.524,29.612z" />
            </g>
          </svg>
        </div>
      </Link>
      <img
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-3/4 object-cover"
        src={image}
      />
      <CardHeader className="relative z-10 top-1 flex-col !items-start w-[100%] ">
        <p className="w-[100%] absolute -left-0 py-2 font-extrabold text-base text-center backdrop-blur-lg uppercase text-white overflow-clip h-[110%]">
          {title.length > 20 ? title.slice(0, 20) : title}
        </p>
        <p className="w-[100%] absolute -left-0 top-10  flex justify-around py-2 font-light text-base text-center uppercase text-white">
          <p>{type} </p>
          <p>{year}</p>
        </p>
      </CardHeader>
    </Card>
  );
};

export default Card_Component;
