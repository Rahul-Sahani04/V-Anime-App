import React, { useState } from "react";

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

const CustomSlider1 = ({ EpList, fetchM3U8, currentEp, query }) => {
  const [swiper, setSwiper] = useState(null);
  console.log(EpList);
  // SwiperCore.use([Navigation, Pagination, A11y]);

  const handleLinkClick = (episodeId) => {
    fetchM3U8(episodeId);
    if (swiper) {
      swiper.slideTo(currentEp);
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
        className="mySwiper xl:absolute xl:flex xl:flex-row !flex-col left-[10%] h-[50%] w-3/4 m-5 place-self-end text-white"
        allowTouchMove="true"
        lazyPreloadPrevNext={2}
      >
        {EpList.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!flex justify-center items-center lg:ml-8 md:ml-8"
          >
            <Link
              className="link"
              to={{
                pathname: "/watch",
                search: `?query=${query}&ep=${item.id}`,
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
                <p
                  className={`w-full text-white ${"text-2xl"} text-center backdrop-blur-lg bg-[#2b2b2b] bg-opacity-70  `}
                >
                  {item.title
                    ? item.title != "⠀"
                      ? item.title
                      : item.number
                    : item.number}
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
