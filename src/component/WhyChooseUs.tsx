"use client";

import Image from "next/image";
import { useMemo } from "react";
import styles from "../styles/HomeReview.module.scss";

const WhyChooseUs = () => {
  const data = useMemo(
    () => [
      {
        icon: "/asset/images/fresh-removebg-preview.png",
        text: "100% Natural & Homemade",
      },
      {
        icon: "/asset/images/HomeMade-removebg-preview.png",
        text: "Every order is freshly prepared",
      },
      {
        icon: "/asset/images/NoAdditives-removebg-preview.png",
        text: "No artificial additives added",
      },
      {
        icon: "/asset/images/NoPreservatives-removebg-preview.png",
        text: "No preservatives added",
      },
      {
        icon: "/asset/images/SaltSugar-removebg-preview.png",
        text: "No salt/sugar added",
      },
      {
        icon: "/asset/images/NoMilkSolids-removebg-preview.png",
        text: "No milk solids added",
      },
      {
        icon: "/asset/images/hyginic-removebg-preview.png",
        text: "Hygienically prepared",
      },
      {
        icon: "/asset/images/Balanced-removebg-preview.png",
        text: "Balanced Nutritious food",
      },
    ],
    []
  );

  return (
    <section className={styles.whySection}>
      <div className={styles.innerContainer}>
        <h1 className={styles.title}>Why to Choose Us?</h1>

        <div className={styles.grid}>
          {data.map((item, index) => (
            <div key={index} className={styles.whyCol}>
              <div className={styles.circleIcon}>
                <Image
                  src={item.icon}
                  alt={`why-icon-${index + 1}`}
                  width={90}
                  height={90}
                  className={styles.iconImage}
                />
              </div>
              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
