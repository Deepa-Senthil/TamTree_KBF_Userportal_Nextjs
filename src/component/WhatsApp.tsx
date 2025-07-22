"use client";

import styles from "../styles/WhatsApp.module.scss";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+918095675500?text=Hi%20!%20Kathir%20Baby%20Foods%20"
      className={styles.whatsapp}
      target="_blank"
      aria-label="WhatsApp"
    >
      <div className={styles.innerCircle}>
        {/* SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="white"
        >
          <path d="M19.11 17.89c-.27-.13-1.58-.77-1.82-.86s-.42-.13-.6.13-.69.86-.84 1.04-.31.2-.58.07a6.89 6.89 0 0 1-2.04-1.26 7.71 7.71 0 0 1-1.43-1.8c-.15-.26 0-.4.11-.53.11-.11.26-.28.4-.42s.18-.23.27-.39a.47.47 0 0 0 0-.45c-.07-.13-.6-1.44-.82-1.97s-.44-.45-.6-.45h-.52a1 1 0 0 0-.73.34A3.07 3.07 0 0 0 8.9 13a6.61 6.61 0 0 0 .95 3.29 15.29 15.29 0 0 0 2.56 3.11c1.52 1.39 3.63 2.44 4.25 1.9s1.17-1.39 1.33-1.79-.14-.26-.4-.39z" />
          <path d="M16 3A13 13 0 0 0 3 16a13 13 0 0 0 1.9 6.74L3 29l6.45-1.87A13 13 0 1 0 16 3zm0 23.67a10.7 10.7 0 0 1-5.45-1.5l-.39-.23-3.83 1.1 1.14-3.73-.25-.4A10.7 10.7 0 1 1 16 26.67z" />
        </svg>
      </div>
    </a>
  );
}
