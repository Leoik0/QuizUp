import React from "react";
import { Link } from "react-router-dom";
import "./Topicos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";

import "swiper/css/pagination";

function Topicos({ topicos }) {
  return (
    <div className="topicos">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={3}
      >
        {topicos.map((topico, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <Link to={`/quiz/${topico.category}`}>
              <img src={topico.foto} className="tema-foto" />
              <p className="p-category">{topico.category}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Topicos;
