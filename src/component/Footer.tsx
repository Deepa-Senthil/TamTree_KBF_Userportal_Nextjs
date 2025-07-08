"use client"; // Mark this as a Client Component

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/Home.module.scss";

const Footer = () => {
  const router = useRouter();

  const shopItems = [
    { label: "For Babies", path: "/featuredcategories" },
    { label: "For Toddlers", path: "/featuredcategories" },
    { label: "For Moms", path: "/featuredcategories" },
    { label: "Herbal Products", path: "/featuredcategories" },
  ];

  // Function to handle navigation and scroll to top
  const handleNavigation = (path: string) => {
    router.push(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Support Section */}
        <div className={styles.footerSection}>
          <h5 className={styles.footerHeading}>Kathir Baby Foods</h5>

          {/* Logo and FSSAI Number (Stacked) */}
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <Link href="/contactus" scroll={true}>
                <Image
                  src="/asset/images/kbf-logo.jpg"
                  alt="Kathir Baby Foods Logo"
                  width={150}
                  height={150}
                  className={styles.logoImage}
                />
              </Link>

              <p className={styles.fssaiText}>FSSAI - 22418141000165</p>
            </div>
          </div>
        </div>

        {/* Shop Section */}
        <div className={styles.footerSection}>
          <h6 className={styles.footerHeading}>SHOP NOW</h6>
          <div className={styles.shopItemsWrapper}>
            {shopItems.map((item) => (
              <button
                key={item.label}
                className={styles.shopItem}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* PACKAGING Section */}
        <div className={styles.footerSection}>
          <h6 className={styles.footerHeading}>SAFE PACKAGING</h6>
          <div className={styles.packagingWrapper}>
            <p className={styles.packagingText}>
              We use triple packing to ensure that products are delivered
              safely.
            </p>
            <p className={styles.packagingText}>NO packaging charges.</p>
          </div>
        </div>

        {/* Policies Section */}
        <div className={styles.footerSection}>
          <h6 className={styles.footerHeading}>FOLLOW US</h6>
          <div className={styles.socialIcons}>
            <a
              href="https://wa.me/+918095675500?text=Hi%20!%20Kathir%20Baby%20Foods%20"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                width={35}
                height={35}
              />
            </a>

            <a
              href="https://www.facebook.com/kathirbabyfoods.official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                width={30}
                height={30}
              />
            </a>
            <a
              href="https://instagram.com/Kathirbabyfoods.official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                width={30}
                height={30}
              />
            </a>
            <a href="mailto:kathirbabyfoods2016@gmail.com">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
                alt="Email"
                width={30}
                height={30}
              />
            </a>
            <a
              href="https://g.co/kgs/uzabt9n"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/google-icon-logo-svgrepo-com.svg"
                alt="google"
                width={28}
                height={28}
              />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        {/* Divider Line */}
        <div className={styles.divider} />

        {/* Copyright Text */}
        <p className={styles.copyrightText}>
          CopyRights ©{new Date().getFullYear()} Kathir Baby Foods. Developed by
          Tamtree India Private Limited.
        </p>
      </div>
    </footer>
  );
};

export default Footer;