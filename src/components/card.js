import React from "react";
import { Link } from "react-router-dom";
// import './card.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

const Card_Component = ({
  title,
  otherTitle,
  id,
  SubOrDub,
  image,
  href_q,
  theme_mode,
}) => {
  return (
    <Card className="relative col-span-12 sm:col-span-4 h-[250px] w-3/4">
      <Link
        to={{
          pathname: "/details",
          search: `?id=${id}`,
        }}
        className={"main-card"}
      >
        <div className="w-full h-full absolute flex justify-center items-center z-10 backdrop-blur-sm opacity-0 hover:opacity-80 hover:text-2xl transition-all delay-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
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
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="w-[110%] absolute -left-2 py-2 font-extrabold text-base text-center backdrop-blur-lg  uppercase">
          {title}
        </p>
        <h4 className="text-white  font-bold text-large">{SubOrDub}</h4>
      </CardHeader>
      <img
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover background-image: linear-gradient(to bottom right, from white, to #000000)"
        src={image}
      />
    </Card>
  );
};

export default Card_Component;

// function name(params) {
//   return (
//     <div className="transition-all duration-300 ease-in-out card-container hover:scale-105">
//       <div className="wrapper">
//         <div
//           style={{
//             backgroundImage: `url(${image})`,
//           }}
//           className="banner-image object-fill"
//         ></div>
//         {title ? (
//           <h4 className="m-2 font-semibold font-sans text-base overflow-hidden h-14">
//             {title}
//           </h4>
//         ) : (
//           <h4 className="font-semibold font-sans text-base overflow-hidden">
//             {otherTitle}
//           </h4>
//         )}

//         {SubOrDub ? (
//           ""
//         ) : (
//           <p className="mr-5 font-sans relative flex">{SubOrDub}</p>
//         )}
//       </div>
//       <div className="button-wrapper justify-between">
//         <Link
//           to={{
//             pathname: "/details",
//             search: `?id=${id}`,
//           }}
//           className={"main-card"}
//         >
//           <button className="btn outline mr-1 hover:z-30">DETAILS</button>
//         </Link>

//         <Link
//           to={{
//             pathname: "/watch",
//             search: `?query=${id}`,
//           }}
//           className={"main-card"}
//         >
//           <button className="btn fill ml-1 hover:z-30">Watch Now</button>
//         </Link>
//       </div>
//     </div>
//   );
// }
