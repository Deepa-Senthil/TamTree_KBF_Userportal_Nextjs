"use client";

import styles from "../styles/Home.module.scss";

const HomeMarquee = () => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent}>
        <span className={styles.marqueeText}>
          Freshly Prepared Healthy & Natural Homemade Baby Foods at your Door
          Step
        </span>
        {/* <span className={styles.marqueeText}>
          Freshly Prepared Healthy & Natural Homemade Baby Foods at your Door
          Step
        </span> */}
      </div>
    </div>
  );
};

export default HomeMarquee;
