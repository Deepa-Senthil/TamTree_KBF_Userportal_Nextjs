"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "../styles/Home.module.scss";
import { useCart } from "../context/CartContext";

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.top}>
        {/* Logo + Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <img src="/asset/images/kbf-logo.jpg" alt="Kathir Baby Foods" />
          </Link>
          <div className={styles.brandText}>
            <div className={styles.title}>Kathir Baby Foods</div>
            <Link href="tel:+918095675500" className={styles.phone}>
              📱 +91‑80956‑75500
            </Link>
          </div>
        </div>

        {/* Search and Cart Group (Desktop) */}
        <div className={styles["search-cart-group"]}>
          <div className={styles["search-box"]}>
            <input type="search" placeholder="Search Products" />
            <span className={styles.icon}>🔍</span>
          </div>
          <a onClick={onCartClick} className={styles.cart}>
            🛒
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </a>
        </div>

        {/* Mobile Icons (Search, Cart, Hamburger) */}
        <div className={styles.mobileIcons}>
          <span className={styles["mobile-search"]}>🔍</span>
          <a onClick={onCartClick} className={styles.cart}>
            🛒
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </a>
          <button
            className={styles.hamburger}
            onClick={toggleNav}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={`${styles.navLinks} ${navOpen ? styles.open : ""}`}>
        {[
          { href: "/", label: "Home" },
          { href: "/ourcatalog", label: "Our Catalog" },
          { href: "/reviews", label: "Customer Reviews" },
          { href: "/about", label: "About Us" },
          { href: "/contactus", label: "Contact Us" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? styles.active : ""}
            onClick={() => setNavOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
