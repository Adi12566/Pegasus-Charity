import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const CardSlider = ({ data }) => {
  return (
    <Swiper
      spaceBetween={300}
      slidesPerView={6}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      // Add more Swiper options as needed
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="card-slider-item">
            <div className="card-image">
              <img src={item.image} alt={item.altText} />
            </div>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p>{item.profession}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* Navigation buttons */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
};

export default CardSlider;