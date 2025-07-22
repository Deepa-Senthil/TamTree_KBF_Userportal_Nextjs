"use client";

import { useEffect, useState } from "react";
import styles from "../styles/ScrollToTop.module.scss";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showTopBtn && (
        <div className={styles.scrollButton} onClick={goToTop}>
          <svg
            className={styles.arrowIcon}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L4 10h5v8h6v-8h5L12 2z" />
          </svg>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;