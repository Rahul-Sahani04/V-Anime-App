import React, {useState} from "react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CustomSlider1 = ({ EpList, fetchM3U8, currentEp }) => {
  const [swiper, setSwiper] = useState(null);

  // SwiperCore.use([Navigation, Pagination, A11y]);

  const handleLinkClick = (episodeId) => {
    fetchM3U8(episodeId);
    if (swiper){
      swiper.slideTo(currentEp)
    }
  };

  return (
    <div>
      <Swiper
      onSwiper={setSwiper}
        direction={"horizontal"}
        slidesPerView={5}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination, Navigation, Scrollbar, A11y]}
        className="mySwiper absolute left-[10%] h-[50%] w-3/4 m-5 place-self-end"
        allowTouchMove="true"
        lazyPreloadPrevNext={2}
      >
        {EpList.map((item) => (
            <SwiperSlide
              key={item.id}
              className="!flex justify-center items-center"
            >
          <Link
            className="link"
            to={{
              pathname: "/watch",
              search: `?ep=${item.id}`,
            }}
            onClick={() => handleLinkClick(item.id)}
            key={item.id}
          >
              <div
                style={{
                  backgroundImage: "url(" + item.image + ")",
                }}
                className="bg-center bg-cover rounded-lg overflow-hidden w-[200px] h-[300px] flex flex-col justify-center items-center "
              >
                <p className={`w-full ${item.title ? item.title != "⠀" ? "text-base" : "text-7xl" : "text-7xl" } text-center backdrop-blur-lg bg-[#2b2b2b] bg-opacity-70  `}>
                  {item.title ? item.title != "⠀" ? item.title : item.number  : item.number}
                </p>
              </div>
          </Link>
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSlider1;
