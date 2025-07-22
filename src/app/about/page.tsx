"use client";

import Head from "next/head";
import styles from "../../styles/Aboutus.module.scss";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us | Kathir Baby Foods</title>
        <meta
          name="description"
          content="Learn about Kathir Baby Foods – our journey, passion for homemade baby food, and how we grew from a small idea to 55+ trusted products."
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.aboutUsContainer}>
          <h2 className={styles.title}>About Kathir Baby Foods</h2>

          <div className={styles.contentWrapper}>
            {/* Left Side - Image */}
            <div className={styles.imageWrapper}>
              <img src="/asset/images/aboutus-banner.jpg" alt="AboutUs" />
            </div>

            {/* Right Side - Text */}
            <div className={styles.textContent}>
              <h4>Welcome to Kathir Baby Foods!</h4>
              <p>
                Our Journey Begins, when I started to prepare all my baby foods
                in traditional by myself with guidance of my Grandma. I learned
                the tricks how to pick right nutritious ingredients and
                techniques to prepare without losing nutrition while preparing.
                I totally love preparing Homemade foods for my Family which
                gives complete satisfaction at the end of the day in between too
                many hard works.
              </p>
              <p>
                When my friends started asking about varieties of food what I
                gave my son (KATHIR), I started to share my food products, which
                helped them very easily. With my Husband's{" "}
                <strong>tremendous support & encouragement</strong> and my
                parents & friends' support, we turned our passion into a
                thriving business with very few finger-counting products in
                2016. By that time, there were very few Homemade food brands
                available in the market, and we were one of them :) When our Son
                grows, our products also grew :) Now we have 55+ Products with
                Kathir Baby Foods, with premium quality and trust we have built
                with our customers. We proudly say, our clients are coming back
                for their next child... which is definitely a proud moment for
                us. Thank you all for your support and love.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
