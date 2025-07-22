"use client";

import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/HomeReview.module.scss";

const HomeBanner = () => {
  const images = [
    "/asset/images/Kbf-home-banner1.webp",
    "/asset/images/Kbf-home-banner2.webp",
    "asset/images/Kbf-home-banner3.webp",
    "/asset/images/Kbf-home-banner4.webp",
  ];

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className={styles.bannerWrapper}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              
              className={styles.bannerImage}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeBanner;
