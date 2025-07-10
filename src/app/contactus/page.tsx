"use client";

import styles from "../../styles/Contactus.module.scss";
import {
  FaWhatsapp,
  FaInstagram,
  FaGlobe,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.title}>Contact Us - Kathir Baby Foods</h2>

      <div className={styles.gridContainer}>
        {/* Left Image */}
        <div className={styles.imageContainer}>
          <img src="/asset/images/contactus-banner.jpg" alt="Contact Us" />
        </div>

        {/* Right Contact Details */}
        <div className={styles.detailsContainer}>
          <div className={styles.contactStack}>
            <div className={styles.stackItem}>
              <div className={styles.iconBox}>
                <FaWhatsapp />
              </div>
              <a
                href="https://wa.me/+918095675500?text=Hi%20!%20Kathir%20Baby%20Foods%20"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                WhatsApp : +91-8095675500
              </a>
            </div>

            <div className={styles.stackItem}>
              <div className={styles.iconBox}>
                <FaGlobe />
              </div>
              <a
                href="https://g.co/kgs/uzabt9n"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                Google Page : Kathir Baby Foods
              </a>
            </div>

            <div className={styles.stackItem}>
              <div className={styles.iconBox}>
                <FaEnvelope />
              </div>
              <a
                href="mailto:kathirbabyfoods2016@gmail.com"
                className={styles.button}
              >
                kathirbabyfoods2016@gmail.com
              </a>
            </div>

            <div className={styles.stackItem}>
              <div className={styles.iconBox}>
                <FaInstagram />
              </div>
              <a
                href="https://instagram.com/Kathirbabyfoods.official"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                Insta Page : Kathir Baby Foods
              </a>
            </div>

            <div className={styles.stackItem}>
              <div className={styles.iconBox}>
                <FaMapMarkerAlt />
              </div>
              <span className={styles.button}>Location : Tamilnadu, India</span>
            </div>

            <div className={styles.stackItem}>
              <div className={styles.iconBox}>
                <FaClock />
              </div>
              <span className={styles.button}>
                Mon-Sat: 10am to 6pm (WhatsApp only)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
