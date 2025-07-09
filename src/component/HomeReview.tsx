"use client";

import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/HomeReview.module.scss";

interface Testimonial {
  text: string;
  name: string;
  location: string;
  logo: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Fresh and home made products. Great quality, packing and value for money.I have recommended Kathir Baby Foods products to many of my friends and family.You can blindly trust Kathir Baby foods for their authenticity and great customer service.",
    name: "Mrs.Kavita, Hyderabad",
    location: "Chennai",
    logo: "src/assets/Logo-removebg-preview.png",
  },
  {
    text: "My baby liked the Kerala Raw Banana Porridge very much. I'm giving her daily and it's quite healthy.Women's Special Health Drink and Multigrain Kanji Maav are very filling and helping me stay active for 3-4 hours w/o having to munch in between.. it's giving me enough strength and taste is yummy",
    name: "Mrs.Lakshmi, Hyderabad",
    location: "Chennai",
    logo: "src/assets/Logo-removebg-preview.png",
  },
  {
    text: "Herbal oil is truly Magical!.I've noticed amazing results in my daughter's hair.Her hair has become much thicker and the dandruff is completely gone. The split ends also disappeared.Thank you for providing an incredible product.",
    name: "Mrs.Param, Pune",
    location: "Tirunelveli",
    logo: "src/assets/Logo-removebg-preview.png",
  },
  {
    text: "I love your products, especially Ragi products and all baby products.since am living in abroad it’s very difficult to get ragi with quality products.I love the quality and packaging… thank you so much for delivering the package on time…",
    name: "Mrs. Sadhana, USA",
    location: "Chennai",
    logo: "src/assets/Logo-removebg-preview.png",
  },
  {
    text: "Protein Health Mix is Awesome product, my son like the taste very much. Its difficult to feed him any nuts, but this product helps a lot Aroma is superb, packing is too perfect and it useful to have with same ziplog package.",
    name: "Mrs.Anitha, Chennai",
    location: "Bangalore",
    logo: "src/assets/Logo-removebg-preview.png",
  },
  {
    text: "Awesome product neatly packed and delivered on time.I tried kerala raw banana, rice banana cereal,organic sprouted ragi,wheat almond porridge and dry nuts powder.... Highly recommend to all mothers.....",
    name: "Mrs.Priya, USA",
    location: "Tirunelveli",
    logo: "src/assets/Logo-removebg-preview.png",
  },
  {
    text: "It’s really good and definitely healthy and filling for the baby, helps a lot during travel and very helpful for working mom. I find the price to be reasonable and packing is excellent.Sincere appreciation and kudos to kathir baby food owner and team",
    name: "Mrs.Selina, Bangalore",
    location: "Mumbai",
    logo: "src/assets/Logo-removebg-preview.png",
  },
  {
    text: "Instant poho mix which I bought for first time. ..It's really v good, comes handy while traveling..the flavour taste both are good and aromatic he like it a lot .Really thank you for such good product for us . And tried multi grain sathumavu it's too good and tatsty thanks once again 🙂.",
    name: "Mrs.Janani, Chennai",
    location: "Mumbai",
    logo: "src/assets/Logo-removebg-preview.png",
  },
  {
    text: "We know kathirs baby foods for last 5 years...for my kids.it's all homemade,healthy and tasty food for kids..now am bought hair oil.it's really magical and amazing product..thank you so so much kathir and kavins love and care products...love u so much.",
    name: "Mrs.Jayasree, Kerala",
    location: "Mumbai",
    logo: "src/assets/Logo-removebg-preview.png",
  },
  {
    text: "I am using almost all products from Kathir baby foods for the past 7 years and there has never been a compromise to quality and taste. The ingredients used for the products are so good & fresh and they are processed very well that it stays fresh for several months.I'm using the oil too and it works great.",
    name: "Mrs.Pavithra, USA",
    location: "Mumbai",
    logo: "src/assets/Logo-removebg-preview.png",
  },
];

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button className={`${styles.arrow} ${styles.nextArrow}`} onClick={onClick}>
    ❯
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button className={`${styles.arrow} ${styles.prevArrow}`} onClick={onClick}>
    ❮
  </button>
);

const HomeReview: React.FC = () => {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className={styles.testimonialsWrapper}>
      <h2 className={styles.title}>
        What our customers say ? !
      </h2>

      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCardWrapper}>
              <div className={styles.testimonialCard}>
                <p className={styles.testimonialText}>"{testimonial.text}"</p>
                <p className={styles.testimonialName}>- {testimonial.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.readMoreWrapper}>
        <a
          className={styles.readMoreButton}
          onClick={() => router.push("/customerreviews")}
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default HomeReview;
